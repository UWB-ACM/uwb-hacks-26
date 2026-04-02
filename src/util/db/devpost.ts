import "server-only";

import sql from "@/src/util/database";
import { DevpostUser, Project } from "@/src/util/dataTypes";

/**
 * Upserts a Devpost registrant into the devpost_users table.
 * @param user - is the registrant to upsert.
 */
export async function upsertDevpostUser(
    user: Omit<DevpostUser, "id">,
): Promise<void> {
    await sql`
        INSERT INTO devpost_users (first_name, last_name, email, project_url)
        VALUES (${user.firstName}, ${user.lastName}, ${user.email}, ${user.projectUrl})
        ON CONFLICT (email) DO UPDATE SET
            first_name = EXCLUDED.first_name,
            last_name = EXCLUDED.last_name,
            project_url = EXCLUDED.project_url
    `;
}

/**
 * Upserts a project into the projects table.
 * @param project - is the project to upsert.
 */
export async function upsertProject(
    project: Omit<Project, "id">,
): Promise<void> {
    await sql`
        INSERT INTO projects (devpost_id, project_title, submission_url, submitted, devpost_image, try_url, video_url, main_track, side_tracks, user_emails)
        VALUES (${project.devpostId}, ${project.projectTitle}, ${project.submissionUrl}, ${project.submitted}, ${project.devpostImage}, ${project.tryUrl}, ${project.videoUrl}, ${project.mainTrack}, ${project.sideTracks}, ${project.userEmails})
        ON CONFLICT (devpost_id) DO UPDATE SET
            project_title = EXCLUDED.project_title,
            submission_url = EXCLUDED.submission_url,
            submitted = EXCLUDED.submitted,
            devpost_image = EXCLUDED.devpost_image,
            try_url = EXCLUDED.try_url,
            video_url = EXCLUDED.video_url,
            main_track = EXCLUDED.main_track,
            side_tracks = EXCLUDED.side_tracks,
            user_emails = EXCLUDED.user_emails
    `;
}

/**
 * Returns all devpost_tag values from the tracks table.
 */
export async function getAllTrackTags(): Promise<string[]> {
    const data =
        await sql`SELECT devpost_tag FROM tracks WHERE devpost_tag IS NOT NULL`;
    return data.map((row) => row.devpost_tag);
}
