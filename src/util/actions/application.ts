"use server";
import "server-only";

import { ApplicationData } from "@/src/util/dataTypes";
import { saveApplication } from "../db/application";
import { getSession } from "../session";
import { validateApplicationData } from "../applicationValidation";

/**
 * Saves the application data for the user who sent this request.
 * If they already sent an application, override it.
 * @param data - is the application data to save.
 */
export async function actionSaveApplication(data: ApplicationData) {
    const session = await getSession();

    const userID = session.user?.id;
    if (!userID) {
        throw new Error(
            "User ID not found when attempting to save hackathon application",
        );
    }

    const validationErrors = validateApplicationData(data);
    if (validationErrors) {
        throw new Error(`Application data is invalid: ${validationErrors}`);
    }

    await saveApplication(userID, data);
}
