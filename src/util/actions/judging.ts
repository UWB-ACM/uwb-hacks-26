"use server";

import sql from "@/src/util/database";
import { getSession } from "@/src/util/session";
import { getPermissionLevel } from "@/src/util/db/user";
import { hasPermissions, PermissionLevel } from "@/src/util/dataTypes";
import { JUDGES_PER_TRACK } from "@/src/util/dataTypes";

export async function actionAssignJudges() {
    try {
        // 1. SECURITY: Check if user is logged in and is an Admin
        const session = await getSession();
        if (session.user?.id == null) {
            return {
                success: false,
                error: "You must be logged in to perform this action.",
            };
        }

        const permission = await getPermissionLevel(session.user.id);
        const isAdmin =
            permission != null &&
            hasPermissions(permission, {
                has: PermissionLevel.Admin,
            });

        if (!isAdmin) {
            return {
                success: false,
                error: "Unauthorized: Admin permission level required.",
            };
        }

        // 2. DATA FETCHING: Pull raw data from Supabase
        const rawTracks = await sql`SELECT id, devpost_tag FROM tracks`;
        const rawProjects =
            await sql`SELECT id, main_track, side_tracks FROM projects`;
        const rawJudges = await sql`SELECT id, track_ids FROM judge_info`;
        const rawAssignments =
            await sql`SELECT judge_id, project_id FROM judge_assignments`;

        // 3. SANITIZATION: Ensure IDs are Numbers and structures are clean
        const allTracks = rawTracks.map((t) => ({
            id: Number(t.id),
            devpost_tag: t.devpost_tag,
        }));
        const allProjects = rawProjects.map((p) => ({
            id: Number(p.id),
            main_track: p.main_track,
            side_tracks: p.side_tracks,
        }));
        const allJudges = rawJudges.map((j) => ({
            id: Number(j.id),
            track_ids: (j.track_ids || []).map(Number),
        }));
        const assignments = rawAssignments.map((a) => ({
            judge_id: Number(a.judge_id),
            project_id: Number(a.project_id),
        }));

        // 4. INDEXING: Create Maps for high-performance O(1) lookups
        const judgeMap = new Map(allJudges.map((j) => [j.id, j]));
        const trackMap = new Map(allTracks.map((t) => [t.devpost_tag, t]));

        const judgeWorkload = new Map<number, number>();
        for (const j of allJudges) judgeWorkload.set(j.id, 0);
        for (const a of assignments) {
            judgeWorkload.set(
                a.judge_id,
                (judgeWorkload.get(a.judge_id) || 0) + 1,
            );
        }

        let newAssignmentsCount = 0;
        const warnings: string[] = [];

        // 5. ASSIGNMENT ENGINE
        for (const project of allProjects) {
            const projectTrackTags = Array.from(
                new Set([project.main_track, ...project.side_tracks]),
            );

            for (const tag of projectTrackTags) {
                if (!tag) {
                    warnings.push(
                        `Project ${project.id} has an empty track tag.`,
                    );
                    continue;
                }

                const track = trackMap.get(tag);
                if (!track) {
                    warnings.push(
                        `Track tag "${tag}" (Project ${project.id}) not found.`,
                    );
                    continue;
                }

                const projectAssignments = assignments.filter(
                    (a) => a.project_id === project.id,
                );

                // Note: Count judge contributions across tracks for the same project
                const trackJudgesAssignedCount = projectAssignments.filter(
                    (a) => {
                        const judge = judgeMap.get(a.judge_id);
                        return judge?.track_ids.includes(track.id);
                    },
                ).length;

                if (trackJudgesAssignedCount < JUDGES_PER_TRACK) {
                    const needed = JUDGES_PER_TRACK - trackJudgesAssignedCount;

                    const candidates = allJudges
                        .filter((j) => {
                            return (
                                j.track_ids.includes(track.id) &&
                                !projectAssignments.some(
                                    (a) => a.judge_id === j.id,
                                )
                            );
                        })
                        .sort(
                            (a, b) =>
                                (judgeWorkload.get(a.id) || 0) -
                                (judgeWorkload.get(b.id) || 0),
                        );

                    if (candidates.length < needed) {
                        warnings.push(
                            `Insufficient judges for track "${tag}" (Project ${project.id}). Found ${candidates.length}/${needed}.`,
                        );
                    }

                    for (
                        let i = 0;
                        i < Math.min(needed, candidates.length);
                        i++
                    ) {
                        const selectedJudge = candidates[i];

                        await sql`
                            INSERT INTO judge_assignments (judge_id, project_id)
                            VALUES (${selectedJudge.id}, ${project.id})
                            ON CONFLICT (judge_id, project_id) DO NOTHING
                        `;

                        newAssignmentsCount++;

                        // Update local tracking maps
                        judgeWorkload.set(
                            selectedJudge.id,
                            (judgeWorkload.get(selectedJudge.id) || 0) + 1,
                        );
                        assignments.push({
                            judge_id: selectedJudge.id,
                            project_id: project.id,
                        });
                    }
                }
            }
        }

        return { success: true, count: newAssignmentsCount, warnings };
    } catch (error) {
        console.error("Assignment Error:", error);
        return { success: false, error: "A database error occurred." };
    }
}
