import sql from "@/src/util/database";
import { User } from "../dataTypes";

/**
 * Returns array of project IDs assigned to this judge
 * @param judgeId userid that correspondes to the Judge's id 
 * @returns An array of integers of the project IDs that have been assigned to this judge
 */
export async function getJudgeAssignments(judgeId: number): Promise<number[]> {
  // TODO: implement function
  return [];
}


/**
 * Returns a full project object with all of its attributes
 * @param projectId the id of the project you need to recieve
 * @returns a project object with all of its attributes
 */
export async function getProject(projectId: number): Promise<object | null> {
    // TODO: create Project class
    // TODO: implement function
    return null;
}


/**
 * Adds a track to a judges profile
 * @param judgeId judge's id of which whose track you want to set, user id
 * @param trackId track you want to assign to the judge
 */
export async function addJudgeTrack(judgeId: number, trackId: number) : Promise<void> {
    // TODO: implement function

}

/**
 * Removes a certain track from a judge's profile
 * @param judgeID user id that correspondes to the judge
 * @param trackId track id that wants to be removed
 */
export async function removeJudgeTrack(judgeId: number, trackId: number) : Promise<void> {
    //TODO: implement function
}
/**
 * Get's a certian judge's track
 * @param judgeId the id of the judge who's track you want to get 
 * @returns returns all the judge's track numbers
 */
export async function getJudgeTracks(judgeId : number): Promise<number | null> {
    // TODO: implement function
    return -1;
}


/**
 * Inserts or updates a judging score (using INSERT ... ON CONFLICT)
 * @param projectId The id of the project that needs to be updated
 * @param judgeId the judge whose score is being submitted
 * @param questionId the id of the question that is being scored
 * @param questionScore the score that the judge gave to the question
 */
export async function updateScores(projectId: number, judgeId : number, questionId: number, questionScore : number) : Promise<void> {
    // TODO: implement function
}

/**
 * Get's all the relevant scores for the project
 * @param projectId the projectID that you want to get all the relevant scores for 
 * @returns dictObject that gives key:value pairs of questionID : questionScore.
 */
export async function getScores(projectId: number): Promise<void> {

}