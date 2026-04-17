"use client";

import React, {
    useState,
    useTransition,
    useEffect,
    useRef,
    useCallback,
} from "react";
import { actionLinkDevpostAccount } from "@/src/util/actions/devpost";

type Props = {
    code: string;
    devpostEmail: string;
    currentUserEmail: string;
    devpostConflict: boolean;
    uwbHacksConflict: boolean;
    applicationWarning: boolean;
    hasApplication: boolean;
};

export default function LinkDevpostClient({
    code,
    devpostEmail,
    currentUserEmail,
    devpostConflict,
    uwbHacksConflict,
    applicationWarning,
    hasApplication,
}: Props) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const autoLinkAttempted = useRef(false);

    const hasAnyConflict = devpostConflict || uwbHacksConflict;

    const handleLink = useCallback(() => {
        setError(null);
        startTransition(async () => {
            const result = await actionLinkDevpostAccount(code);
            if (result.success) {
                setSuccess(true);
            } else {
                setError(result.error);
            }
        });
    }, [code]); // Dependencies: only recreate if the 'code' prop changes

    useEffect(() => {
        if (!hasAnyConflict && !autoLinkAttempted.current) {
            autoLinkAttempted.current = true;
            // eslint-disable-next-line react-hooks/set-state-in-effect
            handleLink();
        }
    }, [hasAnyConflict, handleLink]);

    const warningItems = [
        {
            text: `${devpostEmail} is already linked to a UWB Hacks account`,
            condition: devpostConflict,
        },
        {
            text: `${currentUserEmail} is already linked to a Devpost account`,
            condition: uwbHacksConflict,
        },
    ]
        .filter((a) => a.condition)
        .map((a) => a.text)
        .join(", ");

    let warningSentence = "";
    if (warningItems) {
        warningSentence += `Warning: ${warningItems}. `;
    }

    if (applicationWarning) {
        warningSentence +=
            "Because you have already filled out an application on a different UWB Hacks account, we recommend you do not link these accounts.";
    }

    if (success) {
        return (
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center border border-gray-200">
                <h1 className="text-2xl font-bold text-green-600 mb-4">
                    Account Linked!
                </h1>
                <p className="text-gray-700 mb-6">
                    Your Devpost account has been successfully linked to your
                    profile (<strong>{currentUserEmail}</strong>).
                </p>
                <a
                    href={hasApplication ? "/dashboard" : "/apply"}
                    className="inline-block w-full text-white bg-blue-600 hover:bg-blue-700 font-medium py-3 px-4 rounded-md transition-colors"
                >
                    {hasApplication ? "Return to Dashboard" : "Apply Now"}
                </a>
            </div>
        );
    }

    if (!hasAnyConflict) {
        return (
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center border border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Linking your accounts...
                </h1>
                {error ? (
                    <p className="text-sm text-red-700 mt-4">{error}</p>
                ) : (
                    <p className="text-gray-700 animate-pulse">
                        Please wait a moment.
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Link Devpost Account
            </h1>

            <p className="text-gray-700 mb-4">
                You&apos;re linking <strong>{devpostEmail}</strong> to{" "}
                <strong>{currentUserEmail}</strong>.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-md">
                <p className="text-sm text-yellow-800">{warningSentence}</p>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-md">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            <button
                onClick={handleLink}
                disabled={isPending}
                className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
            >
                {isPending ? "Linking..." : "Link Anyway"}
            </button>
        </div>
    );
}
