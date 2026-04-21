"use server";
import "server-only";

import { getSession } from "@/src/util/session";
import { ensureJudgePermission } from "@/src/util/judge";
import { upsertScore, completeAssignment } from "@/src/util/db/judge";

export async function actionSubmitScore(
    projectId: number,
    questionId: number,
    score: number,
): Promise<void | null> {
    const session = await getSession();

    await ensureJudgePermission(session);
    await upsertScore(session.user!.id, projectId, questionId, score);
}

export async function actionCompleteAssignment(
    projectId: number,
    scoreQuestionArray: [number, number][],
): Promise<void | null> {
    const session = await getSession();

    await ensureJudgePermission(session);
    await Promise.all(
        scoreQuestionArray.map(([questionId, score]) =>
            upsertScore(session.user!.id, projectId, questionId, score),
        ),
    );
    await completeAssignment(session.user!.id, projectId);
}
