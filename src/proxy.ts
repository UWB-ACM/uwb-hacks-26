import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ensureSession } from "@/src/util/session";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function proxy(req: NextRequest) {
    const cookies = createCookieSync(req);

    await ensureSession(req, cookies);

    // We need to pass the URL through as headers since NextJS
    // doesn't allow us to access it in server components
    // otherwise.
    req.headers.set("x-current-url", req.url);

    const res = NextResponse.next({ request: { headers: req.headers } });
    cookies.apply(res);

    return res;
}

/**
 * For some reason, NextJS has decided that to set cookies in the middleware and have
 * them appear in both the browser and downstream server code, we must do the following:
 * 1. Set the cookie on the request object. This must happen before the response object is made.
 *    Data like expiration, etc. is not preserved.
 * 2. Create a response object and copy the newly modified headers to it during construction.
 * 3. Add the same cookies that we added in (1) to the response object, plus extra data like expiration.
 *
 * This is a helper to let us do these steps without interleaving all the middleware code.
 * The middleware functions just call get/set, which works off of the request object, and then we can
 * call apply to do the second pass on response.
 */
export interface CookieSync {
    get(name: string): string | undefined;
    set(cookie: ResponseCookie): void;
    delete(name: string): void;
    apply(response: NextResponse): void;
}

function createCookieSync(request: NextRequest): CookieSync {
    const pending: ResponseCookie[] = [];

    return {
        get(name) {
            return request.cookies.get(name)?.value;
        },
        set(cookie) {
            request.cookies.set(cookie.name, cookie.value);
            pending.push(cookie);
        },
        delete(name) {
            request.cookies.delete(name);
            pending.push({ name, value: "", maxAge: 0 });
        },
        apply(response) {
            for (const cookie of pending) {
                response.cookies.set(cookie);
            }
        },
    };
}
