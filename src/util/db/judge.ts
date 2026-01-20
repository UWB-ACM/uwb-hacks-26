import sql from "@/src/util/database";
import { User } from "../dataTypes";






/**
 * Returns array of project IDs assigned to this judge
 * @param judgeId 
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
 * Sets the judge's track
 * @param judgeId judge's id of which whose track you want to set
 * @param trackId track you want to assign to the judge
 */
export async function setJudgeTrack(judgeId: number, trackId: number) : Promise<void> {
    // TODO: implement function
}

/**
 * Get's a certian judge's track
 * @param judgeId the id of the judge who's track you want to get 
 * @returns returns the judge's track number
 */
export async function getJudgeTrack(judgeId : number): Promise<number | null> {
    // TODO: implement function
    return -1;
}


/**
 * Inserts or updates a judging score (using INSERT ... ON CONFLICT)
 * @param projectId The id of the project that needs to be updated
 * @param questionId the id of the question that is being scored
 * @param judgeId the judge whose score is being submitted
 * @param questionScore the score that the judge gave to the question
 */
export async function updateScores(projectId: number, questionId: number, judgeId : number, questionScore : number) : Promise<void> {
    // TODO: implement function
}