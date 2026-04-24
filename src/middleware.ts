import { proxy } from "@/src/proxy";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    return proxy(req);
}

export const config = {
    /**
     * Run middleware on all routes except:
     * - /_next/static  — pre-built JS/CSS bundles (fetched many times per page load)
     * - /_next/image   — image optimisation endpoint
     * - /favicon.ico and common static file extensions
     *
     * Without this exclusion, every asset fetch would trigger ensureSession +
     * ratelimit.limit(), each of which costs Redis commands.
     */
    matcher: [
        "/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
    ],
};
