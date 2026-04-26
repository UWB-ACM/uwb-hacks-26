"use server";
import { getAllProjects } from "../db/project";
import { sendTableAssignmentEmails } from "../awsSes";

/**
 * Sends email notification to hackathon participants with project presentation room and table number
 * @param req
 * @returns
 */
export async function sendAllTableAssignments() {
    const projects = await getAllProjects();
    await Promise.all(
        projects.map((p) => {
            const message = `Your project will present in ${p.room} at table ${p.tableNum}`;
            sendTableAssignmentEmails(p.userEmails, message);
        }),
    );
    return { success: true };
}
