import { Track, JudgingQuestion, JudgingScore, Project } from "../dataTypes";
import sql from "@/src/util/database";

/**
 * Returns array of project IDs assigned to this judge
 * @param judgeId - is the user id that corresponds to the judge's id
 */
export async function getJudgeAssignments(judgeId: number): Promise<number[] | null> {
    const data =
        await sql`SELECT project_id FROM judge_assignments WHERE judge_id=${judgeId};`;

    if (data.length === 0) {
        return null;
    }

    return data.map((row) => row.project_id);
}

/**
 * Returns a full project object with all of its attributes, or null if not found
 * @param projectId - is the id of the project to retrieve
 */
export async function getProject(projectId: number): Promise<Project | null> {
    const data = await sql `SELECT * FROM projects WHERE id=${projectId}`;

    if (data.length === 0) {
        return null
    }

    return {
        id : data[0].id,
        projectTitle : data[0].project_title,
        submissionUrl : data[0].submission_url,
        submitted : data[0].submitted,
        devpostImage : data[0].devpost_image,
        tryUrl : data[0].try_url,
        videoUrl : data[0].video_url,
        mainTrack : data[0].main_track,
        sideTracks : data[0].side_tracks,
        userEmails : data[0].user_emails
    }
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
    await sql`UPDATE judge_info SET track_ids = array_append(track_ids, ${trackId}) WHERE id = ${judgeId}`;
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
export async function getJudgeTracks(judgeId: number): Promise<number[] | null> {
    const data = await sql`SELECT track_ids FROM judge_info WHERE id=${judgeId}`;

    if (data.length === 0) {
        return null;
    }
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
    const now = new Date()
    await sql`INSERT INTO judging_scores (judge_id, project_id, question_id, score) 
            VALUES (${judgeId}, ${projectId}, ${questionId}, ${score}) ON CONFLICT (judge_id, project_id, question_id) 
            DO UPDATE SET score = EXCLUDED.score, 
            submitted_at = ${now}`;
}

/**
 * Gets all the scores that a specific judge gave out.
 * @param judgeId - is the judge's id number
 */
export async function getScores(judgeId: number): Promise<JudgingScore[] | null> {
    const data = await sql`SELECT * FROM judging_scores WHERE judge_id = ${judgeId}`;
    
    if (data.length === 0) {
        return null;
    }

    return data.map((entry) => ({
        judgeId : entry.judge_id,
        projectId : entry.project_id,
        questionId : entry.question_id, 
        score : entry.score,
        submittedAt : entry.submitted_at
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
    const now = new Date();
    await sql`UPDATE judge_assignments SET completed_at = ${now} WHERE judge_id = ${judgeId} AND project_id = ${projectId}`;
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

    const row = data[0]
    return {
        id : row.id,
        trackName : row.track_name,
        devpostTag : row.devpost_tag,
        mainTrack : row.main_track,
        questions : row.questions
    }
}

/**
 * Returns all tracks.
 */
export async function getAllTracks(): Promise<Track[] | null> {
    const data = await sql`SELECT * FROM tracks`;

    if (data.length === 0) {
        return null
    }
    return data.map((row) => ({
        id: row.id,
        trackName: row.track_name,
        devpostTag: row.devpost_tag,
        mainTrack: row.main_track,
        questions: row.questions,
    }));
}

/**
 * Returns all judging questions.
 */
export async function getJudgingQuestions(): Promise<JudgingQuestion[]> {
    // TODO: implement function
    return [];
}

/**
 * Returns judging questions for a specific track.
 * @param trackId - is the track whose questions to retrieve.
 */
export async function getTrackQuestions(
    trackId: number,
): Promise<JudgingQuestion[] | null> {

    const data = await sql`SELECT * FROM judging_questions WHERE id = ANY(SELECT questions FROM tracks WHERE id=${trackId})`;
    
    if (data.length === 0) {
        return null;
    }

    return data.map((row) => ({
        id : row.id,
        questionText : row.question_text
    }));

}
