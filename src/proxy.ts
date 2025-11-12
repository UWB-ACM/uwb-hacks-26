import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ensureSession } from "@/src/util/session";

export async function proxy(req: NextRequest) {
    const res = NextResponse.next();

    await ensureSession(req, res);

    return res;
}
