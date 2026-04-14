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

/**
 * Syncs devpost emails to users by:
 * 1. Link matching emails between users and imported devpost_users
 * 2. Create devpost_codes entries for unlinked devpost_users to send linking emails to.
 *
 * 3. Returns rows where:
 *      - no linked user exists and
 *      - no code was sent last in the lest 7 days.
 *
 * @returns the list of devpost_emails and codes that need linking emails sent.
 */
export async function syncDevpostEmailsToUsers() {
    // 1. Auto-linking perfectly matching emails.
    await sql`
        UPDATE users 
        SET devpost_email = email 
        WHERE devpost_email IS NULL 
          AND email IN (SELECT email FROM devpost_users);
    `;

    // 2. Inserting into devpost_codes for unlinked devpost_users (if they are in users table with a linked devpost_email, we ignore them).
    await sql`
        INSERT INTO devpost_codes (devpost_email)
        SELECT du.email FROM devpost_users du
        LEFT JOIN users u ON u.devpost_email = du.email
        WHERE u.id IS NULL
        ON CONFLICT DO NOTHING;
    `;

    // 3. Find codes that need emails sent (sent > 7 days ago, OR never sent)
    // AND haven't been linked by a user yet.
    const toEmail = await sql`
        SELECT dc.devpost_email, dc.code 
        FROM devpost_codes dc
        LEFT JOIN users u ON u.devpost_email = dc.devpost_email
        WHERE u.id IS NULL 
          AND (dc.last_sent_at IS NULL OR dc.last_sent_at <= now() - interval '7 days');
    `;

    return toEmail.map((row) => ({
        devpost_email: row.devpost_email,
        code: row.code,
    }));
}

/**
 * Updates devpost codes as sent in the database.
 *
 * @param emails - the list of devpost_emails that we just sent linking emails to.
 */
export async function markDevpostCodesAsSent(emails: string[]) {
    if (emails.length === 0) return;
    await sql`UPDATE devpost_codes SET last_sent_at = now() WHERE devpost_email = ANY(${emails}::text[])`;
}
