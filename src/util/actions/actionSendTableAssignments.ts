"use server";

import { getAllProjects } from "../db/project";
import { sendTableAssignmentEmails } from "../awsSes";
import { ensureAdminPermission } from "../staff";
import { getSession } from "../session";

export async function actionSendTableAssignments() {
    try {
        const session = await getSession();
        await ensureAdminPermission(session);

        const projects = await getAllProjects();

        const results = [];

        for (const p of projects) {
            const message = `Your project has been assigned to present in the following room: \n${p.room} at table ${p.tableNum}.`;

            const result = await sendTableAssignmentEmails(
                p.userEmails,
                message,
            );

            results.push(result);
        }

        return {
            success: true,
            sent: results.reduce((a, r) => a + r.successfulEmails.length, 0),
            failed: results.reduce((a, r) => a + r.failedEmails.length, 0),
        };
    } catch (error) {
        console.error("actionSendTableAssignments error:", error);

        return {
            success: false,
            error: "Failed to send table assignment emails",
        };
    }
}
