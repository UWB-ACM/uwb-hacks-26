"use client";

import React, { useState } from "react";
import Link from "next/link";
import { actionAssignJudges } from "@/src/util/actions/judge";

export default function JudgingAdminClient() {
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");
    const [newCount, setNewCount] = useState(0);
    const [warnings, setWarnings] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleAssign = async () => {
        setStatus("loading");
        setErrorMessage(null);
        setWarnings([]);

        const result = await actionAssignJudges();

        if (result.success) {
            setStatus("success");
            setNewCount(result.count ?? 0);
            setWarnings(result.warnings || []);
        } else {
            setStatus("error");
            setErrorMessage(result.error ?? "Something went wrong.");
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 text-black">
            <div className="w-full max-w-md bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-xl">
                <h1 className="text-4xl font-black italic uppercase mb-4 text-center">
                    Judging Admin
                </h1>

                <div className="bg-yellow-100 border-2 border-black p-4 mb-8 text-sm font-bold">
                    ⚠️ ATTENTION: This will assign judges to every track for
                    every project.
                </div>

                <button
                    onClick={handleAssign}
                    disabled={status === "loading"}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-black py-4 px-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all disabled:opacity-50 uppercase italic"
                >
                    {status === "loading"
                        ? "Assigning..."
                        : "Run Auto-Assignment"}
                </button>

                {status === "success" && (
                    <div className="mt-6 text-center">
                        <p className="text-green-600 font-bold">
                            ✅ Created {newCount} assignments.
                        </p>

                        {warnings.length > 0 && (
                            <div className="mt-4 p-4 bg-orange-50 border-2 border-orange-200 rounded-md text-left">
                                <p className="text-orange-700 font-bold text-sm mb-2">
                                    ⚠️ Data Warnings:
                                </p>
                                <ul className="text-xs text-orange-600 list-disc ml-4 space-y-1">
                                    {warnings.map((w, i) => (
                                        <li key={i}>{w}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {status === "error" && (
                    <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-md">
                        <p className="text-red-600 font-bold text-center">
                            {errorMessage}
                        </p>
                    </div>
                )}

                <Link
                    href="/dashboard"
                    className="block mt-8 text-center font-bold underline decoration-2 underline-offset-4 hover:text-gray-600 text-black"
                >
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}
