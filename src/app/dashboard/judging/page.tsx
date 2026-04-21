import { getSession, redirectToLogin } from "@/src/util/session";
import { getPermissionLevel } from "@/src/util/db/user";
import { hasPermissions, PermissionLevel } from "@/src/util/dataTypes";
import JudgingAdminClient from "./JudgingAdminClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Judging Admin | UWB Hacks 26",
};

export default async function Page() {
    const session = await getSession();

    // 1. Authentication Check
    if (session.user?.id == null) {
        await redirectToLogin(session);
        return;
    }

    // 2. Authorization Check (matches Dashboard pattern)
    const permission = await getPermissionLevel(session.user.id);
    const isAdmin =
        permission != null &&
        hasPermissions(permission, {
            has: PermissionLevel.Admin,
        });

    if (!isAdmin) {
        return (
            <div className="min-h-screen grid place-content-center text-center text-black">
                <h1 className="text-2xl font-black text-red-600 uppercase italic">
                    Access Denied
                </h1>
                <p className="mt-2 font-bold">
                    Admin permissions are required for auto-assignment.
                </p>
            </div>
        );
    }

    // 3. Render the Client UI if authorized
    return <JudgingAdminClient />;
}
