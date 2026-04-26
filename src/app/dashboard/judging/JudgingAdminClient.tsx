"use client";

import React, { useState } from "react";
import Link from "next/link";
import { actionAssignJudges } from "@/src/util/actions/judge";
import { actionSendTableAssignments } from "@/src/util/actions/actionSendTableAssignments";

export default function JudgingAdminClient() {
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");
    const [emailStatus, setEmailStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");

    const [tableCount, setTableCount] = useState(0);
    const [judgeCount, setJudgeCount] = useState(0);
    const [collisionCount, setCollisionCount] = useState(0);
    const [neededRounds, setNeededRounds] = useState<number[]>([]);
    const [warnings, setWarnings] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [emailWarnings, setEmailWarnings] = useState<string[]>([]);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
        null,
    );

    const handleAssign = async () => {
        setStatus("loading");
        setErrorMessage(null);
        setWarnings([]);

        const result = await actionAssignJudges();

        if (result.success) {
            setStatus("success");
            setTableCount(result.tableAssignmentsCount ?? 0);
            setJudgeCount(result.judgeAssignmentsCount ?? 0);
            setCollisionCount(result.collisionCount ?? 0);
            setNeededRounds(result.neededRounds ?? []);
            setWarnings(result.warnings || []);
        } else {
            setStatus("error");
            setErrorMessage(result.error ?? "Something went wrong.");
        }
    };

    const handleNotification = async () => {
        setEmailStatus("loading");

        const result = await actionSendTableAssignments();

        if (result.success) {
            setEmailStatus("success");
        } else {
            setEmailStatus("error");
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 text-black">
            <div className="w-full max-w-md bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-xl">
                <h1 className="text-4xl font-black italic uppercase mb-4 text-center">
                    Judging Admin
                </h1>

                <div className="bg-yellow-100 border-2 border-black p-4 mb-8 text-sm font-bold">
                    ⚠️ ATTENTION: This places unassigned projects at tables,
                    then assigns judges to every track for every project.
                </div>

                <button
                    onClick={handleAssign}
                    disabled={status === "loading"}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-black py-4 px-6 my-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all disabled:opacity-50 uppercase italic"
                >
                    {status === "loading"
                        ? "Assigning..."
                        : "Run Auto-Assignment"}
                </button>
                <button
                    onClick={handleNotification}
                    className="w-full bg-blue-300 hover:bg-blue-400 text-white font-black py-4 px-6 my-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all disabled:opacity-50 uppercase italic"
                >
                    {emailStatus === "loading"
                        ? "Sending..."
                        : "Send Email Notification"}
                </button>

                {status === "success" && (
                    <div className="mt-6 text-center">
                        <p className="text-green-600 font-bold">
                            ✅ Placed {tableCount} project(s) at tables.
                        </p>
                        <p className="text-green-600 font-bold">
                            ✅ Created {judgeCount} judge assignment(s).
                        </p>
                        {collisionCount > 0 ? (
                            <p className="text-orange-600 font-bold mt-2">
                                ⚠️ {collisionCount} round collision(s) detected
                                (3+ judges at the same project).
                            </p>
                        ) : (
                            <p className="text-green-600 font-bold mt-2">
                                ✅ No round collisions.
                            </p>
                        )}
                        {neededRounds.length > 0 && (
                            <p className="text-green-600 font-bold mt-2">
                                ✅ Top judge workloads:{" "}
                                {neededRounds.join(", ")} round(s).
                            </p>
                        )}

                        {warnings.length > 0 && (
                            <div className="mt-4 p-4 bg-orange-50 border-2 border-orange-200 rounded-md text-left">
                                <p className="text-orange-700 font-bold text-sm mb-2">
                                    ⚠️ Warnings ({warnings.length}):
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
