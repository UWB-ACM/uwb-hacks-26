import { Track, JudgingQuestion, JudgingScore, Project } from "../dataTypes";
import sql from "@/src/util/database";

/**
 * Returns an array of Project objects associated with the Judge
 * @param judgeId - is the user id that corresponds to the judge's id
 */
export async function getJudgeAssignments(judgeId: number): Promise<Project[]> {
    const data =
        await sql`SELECT * FROM judge_assignments JOIN projects ON judge_assignments.project_id = projects.id WHERE judge_id=${judgeId};`;

    if (data.length === 0) {
        return [];
    }
    return data.map((row) => ({
        id: row.id,
        devpostId: row.devpost_id,
        projectTitle: row.project_title,
        submissionUrl: row.submission_url,
        submitted: row.submitted,
        devpostImage: row.devpost_image,
        tryUrl: row.try_url,
        videoUrl: row.video_url,
        mainTrack: row.main_track,
        sideTracks: row.side_tracks,
        userEmails: row.user_emails,
    }));
}

/**
 * Returns a full project object with all of its attributes, or null if not found
 * @param projectId - is the id of the project to retrieve
 */
export async function getProject(projectId: number): Promise<Project | null> {
    const data = await sql`SELECT * FROM projects WHERE id=${projectId}`;

    if (data.length === 0) {
        return null;
    }

    return {
        id: data[0].id,
        devpostId: data[0].devpost_id,
        projectTitle: data[0].project_title,
        submissionUrl: data[0].submission_url,
        submitted: data[0].submitted,
        devpostImage: data[0].devpost_image,
        tryUrl: data[0].try_url,
        videoUrl: data[0].video_url,
        mainTrack: data[0].main_track,
        sideTracks: data[0].side_tracks,
        userEmails: data[0].user_emails,
    };
}

/**
 * Adds a track to a judges profile
 * @param judgeId - is the judge's user id
 * @param trackId - is the track to assign to the judge
 */
export async function addJudgeTrack(
    judgeId: number,
    trackId: number,
): Promise<void> {
    await sql`UPDATE judge_info SET track_ids = array_append(track_ids, ${trackId}) WHERE id = ${judgeId} AND ${trackId} != ANY(track_ids)`;
}

/**
 * Removes a certain track from a judge's profile
 * @param judgeId - is the user id that corresponds to the judge
 * @param trackId - is the track id to remove
 */
export async function removeJudgeTrack(
    judgeId: number,
    trackId: number,
): Promise<void> {
    await sql`UPDATE judge_info SET track_ids = array_remove(track_ids, ${trackId}) WHERE id = ${judgeId}`;
}
/**
 * Gets all track IDs assigned to a judge
 * @param judgeId - is the judge's user id
 * @returns array of track IDs
 */
export async function getJudgeTracks(judgeId: number): Promise<number[]> {
    const data =
        await sql`SELECT track_ids FROM judge_info WHERE id=${judgeId}`;

    return data[0].track_ids;
}

/**
 * Inserts or updates a judging score (using INSERT ... ON CONFLICT)
 * @param judgeId - is the judge whose score is being submitted
 * @param projectId - is the project being scored
 * @param questionId - is the question being scored
 * @param score - is the score the judge gave (0 to 10, inclusive)
 */
export async function upsertScore(
    judgeId: number,
    projectId: number,
    questionId: number,
    score: number,
): Promise<void> {
    await sql`INSERT INTO judging_scores (judge_id, project_id, question_id, score) 
            VALUES (${judgeId}, ${projectId}, ${questionId}, ${score}) ON CONFLICT (judge_id, project_id, question_id) 
            DO UPDATE SET score = EXCLUDED.score, 
            submitted_at = NOW()`;
}

/**
 * Gets all the scores that a specific judge gave out.
 * @param judgeId - is the judge's id number
 */
export async function getScores(judgeId: number): Promise<JudgingScore[]> {
    const data =
        await sql`SELECT * FROM judging_scores WHERE judge_id = ${judgeId}`;

    return data.map((entry) => ({
        judgeId: entry.judge_id,
        projectId: entry.project_id,
        questionId: entry.question_id,
        score: entry.score,
        submittedAt: entry.submitted_at,
    }));
}

/**
 * Marks a judge assignment as completed using a timestamp
 * @param judgeId - is the judge's user id.
 * @param projectId - is the project id.
 */
export async function completeAssignment(
    judgeId: number,
    projectId: number,
): Promise<void> {
    await sql`UPDATE judge_assignments SET completed_at = NOW() WHERE judge_id = ${judgeId} AND project_id = ${projectId}`;
}

/**
 * Returns a track by its ID.
 * @param trackId - is the track's id.
 * @returns a Track object, or null if not found.
 */
export async function getTrack(trackId: number): Promise<Track | null> {
    const data = await sql`SELECT * FROM tracks WHERE id = ${trackId}`;

    if (data.length === 0) {
        return null;
    }
    const row = data[0];
    return {
        id: row.id,
        trackName: row.track_name,
        devpostTag: row.devpost_tag,
        mainTrack: row.main_track,
        questions: row.questions,
    };
}

/**
 * Returns all tracks.
 */
export async function getAllTracks(): Promise<Track[]> {
    const data = await sql`SELECT * FROM tracks`;

    return data.map((row) => ({
        id: row.id,
        trackName: row.track_name,
        devpostTag: row.devpost_tag,
        mainTrack: row.main_track,
        questions: row.questions,
    }));
}

/**
 * Gets judging questions for a specific judge for a specific project.
 * @param projectId - this is the id for the project
 * @param judgeId - this is the judge's id
 */
export async function getJudgingQuestions(
    projectId: number,
    judgeId: number,
): Promise<JudgingQuestion[]> {
    const data =
        await sql`SELECT * FROM judging_questions WHERE id IN ( SELECT UNNEST(questions) FROM tracks WHERE tracks.id IN(SELECT UNNEST(track_ids) FROM judge_info WHERE judge_info.id = ${judgeId}) AND tracks.id IN (SELECT main_track FROM projects WHERE project.id = ${projectId} UNION SELECT UNNEST(side_tracks) FROM projects WHERE project.id = ${projectId}));`;
    if (data.length === 0) {
        return [];
    }
    return data.map((row) => ({
        id: row.id,
        questionText: row.question_text,
    }));
}

/**
 * Returns judging questions for a specific track.
 * @param trackId - is the track whose questions to retrieve.
 */
export async function getTrackQuestions(
    trackId: number,
): Promise<JudgingQuestion[]> {
    const data =
        await sql`SELECT * FROM judging_questions WHERE id = ANY(SELECT UNNEST(questions) FROM tracks WHERE id=${trackId})`;

    return data.map((row) => ({
        id: row.id,
        questionText: row.question_text,
    }));
}

/**
 * This function will grab all the questions for a specific project based on it's tracks.
 * @param project_id - this id for the project
 * @returns returns a JudgeQuestions array
 */
export async function grabQuestionsByProject(
    project_id: number,
): Promise<JudgingQuestion[]> {
    const data =
        await sql`SELECT * FROM judging_questions WHERE id = ANY(SELECT UNNEST(questions) FROM tracks WHERE tracks.id IN (SELECT main_track FROM projects where project.id = ${project_id} UNION SELECT UNNEST(side_tracks) FROM projects WHERE project.id = ${project_id})))`;

    return data.map((row) => ({
        id: row.id,
        questionText: row.question_text,
    }));
}
