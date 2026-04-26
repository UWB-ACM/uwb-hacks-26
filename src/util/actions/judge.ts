"use server";
import "server-only";

import { getSession } from "@/src/util/session";
import { ensureJudgePermission } from "@/src/util/judge";
import {
    upsertScore,
    completeAssignment,
    assignJudgeToProject,
    setProjectTable,
} from "@/src/util/db/judge";
import sql from "@/src/util/database";
import { computeTableAssignments } from "@/src/util/judging/tableAssignment";
import {
    analyzeCollisions,
    computeJudgeAssignments,
    AssignProject,
    AssignTrack,
    AssignJudge,
    AssignJudgeAssignment,
} from "@/src/util/judging/judgeAssignment";
import { ensureAdminPermission } from "@/src/util/staff";

/**
 * Submits a single score for one question on one project by the
 * currently-logged-in judge. Called as the judge moves sliders in the
 * scoring UI.
 * @param projectId - is the project being scored.
 * @param questionId - is the judging question being answered.
 * @param score - is the score the judge gave (0 to 10, inclusive).
 */
export async function actionSubmitScore(
    projectId: number,
    questionId: number,
    score: number,
): Promise<void | null> {
    const session = await getSession();

    await ensureJudgePermission(session);
    await upsertScore(session.user!.id, projectId, questionId, score);
}

/**
 * Writes every score in the provided array and then marks the judge's
 * assignment for the project complete. Called when the judge finishes
 * scoring a project in the scoring UI.
 * @param projectId - is the project being finalized.
 * @param scoreQuestionArray - is the list of (questionId, score) pairs
 *     to persist before marking the assignment complete.
 */
export async function actionCompleteAssignment(
    projectId: number,
    scoreQuestionArray: [number, number][],
): Promise<void | null> {
    const session = await getSession();

    await ensureJudgePermission(session);
    await Promise.all(
        scoreQuestionArray.map(([questionId, score]) =>
            upsertScore(session.user!.id, projectId, questionId, score),
        ),
    );
    await completeAssignment(session.user!.id, projectId);
}

/**
 * The result returned by `actionAssignJudges` to the admin UI.
 */
export interface AutoAssignResult {
    /**
     * Whether the run finished successfully. When false, `error` is set.
     */
    success: boolean;

    /**
     * A human-readable error message, when `success` is false.
     */
    error?: string;

    /**
     * The number of projects that were newly placed at a table this run.
     */
    tableAssignmentsCount?: number;

    /**
     * The number of (judge, project) assignments newly created this run.
     */
    judgeAssignmentsCount?: number;

    /**
     * The number of projects that have 3+ judges scheduled on them at
     * the same round in the staggered walk order.
     */
    collisionCount?: number;

    /**
     * The number of rounds needed for everyone to get judged.
     */
    neededRounds?: number;

    /**
     * Non-fatal warnings collected across all three phases.
     */
    warnings?: string[];
}

/**
 * Runs the full auto-assignment pipeline in three phases:
 *   - Table assignment: places any unplaced projects at a (room,
 *     tableNum), respecting track room affinities.
 *   - Judge assignment: assigns judges to projects so every
 *     (project, track) pair gets JUDGES_PER_TRACK judges.
 *   - Collision analysis: builds each judge's staggered walk order
 *     and flags any project that has 3+ judges arriving at the same
 *     round (usually caused by projects in multiple tracks).
 *
 * All three phases share one warnings bag, surfaced on the admin UI.
 * The action is idempotent - safe to re-run after adding late projects
 * or judges.
 */
export async function actionAssignJudges(): Promise<AutoAssignResult> {
    try {
        const session = await getSession();
        await ensureAdminPermission(session);

        const rawProjects = await sql`
            SELECT id, main_track, side_tracks, room, table_num
            FROM projects
            WHERE submitted = true
        `;
        const projectsForTables = rawProjects.map((p) => ({
            id: p.id,
            mainTrack: p.main_track,
            room: p.room,
            tableNum: p.table_num,
        }));
        const tableResult = computeTableAssignments(projectsForTables);

        for (const placement of tableResult.placements) {
            await setProjectTable(
                placement.projectId,
                placement.room,
                placement.tableNum,
            );
        }

        // Merge new placements back into our in-memory view so judge
        // assignment has up-to-date (room, tableNum) for ranking.
        const placementByProjectId = new Map(
            tableResult.placements.map((p) => [
                p.projectId,
                { room: p.room, tableNum: p.tableNum },
            ]),
        );
        const projectsForJudges: AssignProject[] = rawProjects.map((p) => {
            const np = placementByProjectId.get(p.id);
            return {
                id: p.id,
                mainTrack: p.main_track,
                sideTracks: p.side_tracks ?? [],
                room: np?.room ?? p.room,
                tableNum: np?.tableNum ?? p.table_num,
            };
        });

        const rawTracks = await sql`SELECT id, devpost_tag FROM tracks`;
        const rawJudges = await sql`SELECT id, track_ids FROM judge_info`;
        const rawAssignments =
            await sql`SELECT judge_id, project_id FROM judge_assignments`;

        const tracks: AssignTrack[] = rawTracks.map((t) => ({
            id: t.id,
            devpostTag: t.devpost_tag,
        }));
        const judges: AssignJudge[] = rawJudges.map((j) => ({
            id: j.id,
            trackIds: j.track_ids ?? [],
        }));
        const existing: AssignJudgeAssignment[] = rawAssignments.map((a) => ({
            judgeId: a.judge_id,
            projectId: a.project_id,
        }));

        const judgeResult = computeJudgeAssignments(
            tracks,
            projectsForJudges,
            judges,
            existing,
        );

        for (const a of judgeResult.newAssignments) {
            await assignJudgeToProject(a.judgeId, a.projectId);
        }

        // Run collision analysis on the combined assignment set
        // (pre-existing rows plus the ones we just created) so the
        // warning reflects what the judge portal will actually show.
        const allAssignments: AssignJudgeAssignment[] = [
            ...existing,
            ...judgeResult.newAssignments,
        ];
        const collisions = analyzeCollisions(projectsForJudges, allAssignments);

        const warnings = [
            ...tableResult.warnings,
            ...judgeResult.warnings,
            ...collisions.map(
                (c) =>
                    `Collision: project ${c.projectId} at round ${c.round} has ${c.judgeIds.length} judges (${c.judgeIds.join(", ")}).`,
            ),
        ];

        return {
            success: true,
            tableAssignmentsCount: tableResult.placements.length,
            judgeAssignmentsCount: judgeResult.newAssignments.length,
            collisionCount: collisions.length,
            neededRounds: judgeResult.neededRounds,
            warnings,
        };
    } catch (error) {
        console.error("Assignment Error:", error);
        return { success: false, error: "A database error occurred." };
    }
}
