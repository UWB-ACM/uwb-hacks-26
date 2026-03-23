import { Track, JudgingQuestion, JudgingScore, Project } from "../dataTypes";

/**
 * Returns array of project IDs assigned to this judge
 * @param judgeId - is the user id that corresponds to the judge's id
 */
export async function getJudgeAssignments(judgeId: number): Promise<number[]> {
    // TODO: implement function
    return [];
}

/**
 * Returns a full project object with all of its attributes, or null if not found
 * @param projectId - is the id of the project to retrieve
 */
export async function getProject(projectId: number): Promise<Project | null> {
    // TODO: implement function
    return null;
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
    // TODO: implement function
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
    // TODO: implement function
}

/**
 * Gets all track IDs assigned to a judge
 * @param judgeId - is the judge's user id
 * @returns array of track IDs
 */
export async function getJudgeTracks(judgeId: number): Promise<number[]> {
    // TODO: implement function
    return [];
}

/**
 * Inserts or updates a judging score (using INSERT ... ON CONFLICT)
 * @param judgeId - is the judge whose score is being submitted
 * @param projectId - is the project being scored
 * @param questionId - is the question being scored
 * @param score - is the score the judge gave (0 to 10, inclusive)
 */
export async function updateScore(
    judgeId: number,
    projectId: number,
    questionId: number,
    score: number,
): Promise<void> {
    // TODO: implement function
}

/**
 * Gets all scores for a project, grouped by judge
 * @param projectId - is the project to get scores for
 */
export async function getScores(projectId: number): Promise<JudgingScore[]> {
    // TODO: implement function
    return [];
}

/**
 * Marks a judge assignment as completed.
 * @param judgeId - is the judge's user id.
 * @param projectId - is the project id.
 */
export async function completeAssignment(
    judgeId: number,
    projectId: number,
): Promise<void> {
    // TODO: implement function
}

/**
 * Returns a track by its ID.
 * @param trackId - is the track's id.
 * @returns a Track object, or null if not found.
 */
export async function getTrack(trackId: number): Promise<Track | null> {
    // TODO: implement function
    return null;
}

/**
 * Returns all tracks.
 */
export async function getAllTracks(): Promise<Track[]> {
    // TODO: implement function
    return [];
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
): Promise<JudgingQuestion[]> {
    // TODO: implement function
    return [];
}
