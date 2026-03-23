import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ensureSession } from "@/src/util/session";

export async function proxy(req: NextRequest) {
    // We need to pass the URL through as headers since NextJS
    // doesn't allow us to access it in server components
    // otherwise.
    const headers = new Headers(req.headers);
    headers.set("x-current-url", req.url);

    const res = NextResponse.next({ request: { headers } });

    await ensureSession(req, res);

    return res;
}
