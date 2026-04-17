import React from "react";
import { Metadata } from "next";
import Header from "@/src/components/header/Header";
import Footer from "@/src/components/Footer";
import { getSession, redirectToLogin } from "@/src/util/session";
import {
    getEmailFromCode,
    getUserIdByDevpostEmail,
    getDevpostEmailByUserId,
} from "@/src/util/db/devpost";
import { getApplication } from "@/src/util/db/application";
import LinkDevpostClient from "./LinkDevpostClient";

export const metadata: Metadata = {
    title: "Link Devpost Account | UWB Hacks 26",
};

export default async function LinkDevpostPage({
    searchParams,
}: {
    searchParams: Promise<{ code?: string }>;
}) {
    const session = await getSession();
    if (!session.user?.id) {
        await redirectToLogin(session);
        return null;
    }

    const resolvedParams = await searchParams;
    const code = resolvedParams.code;

    let isValidCode = false;

    let devpostEmail = "";
    let devpostConflict = false;
    let uwbHacksConflict = false;
    let applicationWarning = false;
    let hasApplication = false;

    // Validate code and calculate conflict/warning flags
    if (code) {
        const fetchedDevpostEmail = await getEmailFromCode(code);
        if (fetchedDevpostEmail) {
            isValidCode = true;
            devpostEmail = fetchedDevpostEmail;

            // Check current user's DB record to see what they are currently linked to
            const uwbHacksEmail = await getDevpostEmailByUserId(
                session.user.id,
            );

            // Look up who else might own this link's Devpost email
            const conflictingUserId = await getUserIdByDevpostEmail(
                devpostEmail,
                session.user.id,
            );

            // Flag 1: The devpost email is attached to another user
            devpostConflict = conflictingUserId !== null;

            // Flag 2: The current session user already has a DIFFERENT devpost email attached
            uwbHacksConflict =
                uwbHacksEmail !== null && uwbHacksEmail !== devpostEmail;

            const currentUserApp = await getApplication(session.user.id);
            hasApplication = currentUserApp !== null;

            // Flag 3: The conflicting user has an application, but the current user doesn't
            if (devpostConflict && conflictingUserId !== null) {
                const conflictingUserApp =
                    await getApplication(conflictingUserId);

                if (conflictingUserApp !== null && currentUserApp === null) {
                    applicationWarning = true;
                }
            }
        }
    }

    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header links={[{ id: "home", name: "Home", url: "/" }]} />

            <main className="flex-1 flex flex-col items-center justify-center p-4">
                {!isValidCode || !code ? (
                    <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center border border-gray-200">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">
                            Invalid Link
                        </h1>
                        <p className="text-gray-700">
                            This Devpost link is invalid or missing. Please
                            check the email we sent you and try again.
                        </p>
                    </div>
                ) : (
                    <LinkDevpostClient
                        code={code}
                        devpostEmail={devpostEmail}
                        currentUserEmail={session.user.email}
                        devpostConflict={devpostConflict}
                        uwbHacksConflict={uwbHacksConflict}
                        applicationWarning={applicationWarning}
                        hasApplication={hasApplication}
                    />
                )}
            </main>

            <Footer />
        </div>
    );
}
