import "server-only";

import sql from "@/src/util/database";
import { Project } from "../dataTypes";

export interface ProjectJudgeFeedback {
    judgeId: number;
    feedback: string | null;
    completedAt: Date | null;
}

export interface ProjectWithJudgeFeedback {
    project: Project;
    judgeAssignments: ProjectJudgeFeedback[];
}

/**
 * Retrieves the list of every project from the database.
 */
export async function getAllProjects(): Promise<Project[]> {
    const data =
        await sql`SELECT id, devpost_id, project_title, submission_url, submitted, devpost_image, try_url, video_url, main_track, side_tracks, user_emails, room, table_num FROM projects;`;

    return await Promise.all(
        data.map(async (entry) => ({
            id: entry.id,
            devpostId: entry.devpost_id,
            projectTitle: entry.project_title,
            submissionUrl: entry.submission_url,
            submitted: entry.submitted,
            devpostImage: entry.devpost_image,
            tryUrl: entry.try_url,
            videoUrl: entry.video_url,
            mainTrack: entry.main_track,
            sideTracks: entry.side_track,
            userEmails: entry.user_emails,
            room: entry.room,
            tableNum: entry.table_num,
        })),
    );
}

export async function getAllProjectFeedback(): Promise<
    ProjectWithJudgeFeedback[]
> {
    // TODO: add join to add judge names along with feedback
    const data = await sql`
        SELECT
            p.id,
            p.devpost_id,
            p.project_title,
            p.submission_url,
            p.submitted,
            p.devpost_image,
            p.try_url,
            p.video_url,
            p.main_track,
            p.side_tracks,
            p.user_emails,
            p.room,
            p.table_num,
            ja.judge_id,
            ja.feedback,
            ja.completed_at
        FROM projects p
        LEFT JOIN judge_assignments ja ON p.id = ja.project_id
        ORDER BY p.id, ja.judge_id
    `;

    const projectsById = new Map<number, ProjectWithJudgeFeedback>();

    for (const judgeAssignment of data) {
        let projectWithFeedback = projectsById.get(judgeAssignment.id);

        if (!projectWithFeedback) {
            const project: Project = {
                id: judgeAssignment.id,
                devpostId: judgeAssignment.devpost_id,
                projectTitle: judgeAssignment.project_title,
                submissionUrl: judgeAssignment.submission_url,
                submitted: judgeAssignment.submitted,
                devpostImage: judgeAssignment.devpost_image,
                tryUrl: judgeAssignment.try_url,
                videoUrl: judgeAssignment.video_url,
                mainTrack: judgeAssignment.main_track,
                sideTracks: judgeAssignment.side_tracks ?? [],
                userEmails: judgeAssignment.user_emails ?? [],
                room: judgeAssignment.room,
                tableNum: judgeAssignment.table_num,
            };

            // initialize projects w/out judge assignments
            projectWithFeedback = {
                project,
                judgeAssignments: [],
            };

            projectsById.set(judgeAssignment.id, projectWithFeedback);
        }

        // if no judge id, skip
        if (judgeAssignment.judge_id == null) {
            continue;
        }
        // otherwise, add the judge assignment to the project

        // trim and add feedback if exists
        const trimmedFeedback =
            typeof judgeAssignment.feedback === "string" ? judgeAssignment.feedback.trim() : null;

        projectWithFeedback.judgeAssignments.push({
            judgeId: judgeAssignment.judge_id,
            feedback: trimmedFeedback ? trimmedFeedback : null,
            completedAt: judgeAssignment.completed_at ?? null,
        });
    }

    return Array.from(projectsById.values());
}