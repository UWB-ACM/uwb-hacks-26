"use server";
import "server-only";

import { ApplicationData } from "@/src/util/dataTypes";

/**
 * Saves the application data for the user who sent this request.
 * If they already sent an application, override it.
 * @param data - is the application data to save.
 */
export async function actionSaveApplication(data: ApplicationData) {
    // TODO: Implement.
    console.log("application", data);
}
