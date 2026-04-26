import "server-only";

import sql from "@/src/util/database";
import { Project } from "../dataTypes";

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
