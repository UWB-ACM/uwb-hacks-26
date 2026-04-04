import React from "react";
import { getSession } from "@/src/util/session";
import { ensureJudgePermission } from "@/src/util/judge";

export default async function Page() {
    const session = await getSession();
    await ensureJudgePermission(session);
}
