"use client";

import React, { useState } from "react";
import Link from "next/link";
import { actionAssignJudges } from "@/src/util/actions/judging";

export default function JudgingAdminPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [newCount, setNewCount] = useState(0);

    const handleRunAssignment = async () => {
        setStatus("loading");
        const result = await actionAssignJudges();
        
        if (result.success) {
            setNewCount(result.count || 0);
            setStatus("success");
        } else {
            setStatus("error");
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-xl">
                <h1 className="text-4xl font-black italic uppercase mb-4 text-center">Judging Admin</h1>
                
                <div className="bg-yellow-100 border-2 border-black p-4 mb-8 text-sm font-bold">
                    ⚠️ ATTENTION: This will assign 2 judges to every track for every project. 
                    Existing assignments will NOT be deleted.
                </div>

                <button
                    onClick={handleRunAssignment}
                    disabled={status === "loading"}
                    className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-8 px-4 
                               border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                               active:shadow-none active:translate-x-[2px] active:translate-y-[2px] 
                               transition-all text-2xl uppercase disabled:opacity-50"
                >
                    {status === "loading" ? "ASSIGNING..." : "ASSIGN JUDGES"}
                </button>

                {status === "success" && (
                    <p className="mt-6 text-green-600 font-bold text-center animate-bounce">
                        Successfully created {newCount} new assignments!
                    </p>
                )}

                {status === "error" && (
                    <p className="mt-6 text-red-600 font-bold text-center">
                        Something went wrong. Check server logs.
                    </p>
                )}

                <div className="mt-10 pt-6 border-t-2 border-black flex justify-between">
                    <Link href="/dashboard" className="font-bold underline hover:text-red-600">
                        ← Dashboard
                    </Link>
                    <span className="text-gray-400 font-bold uppercase text-xs">UWB Hacks 2026</span>
                </div>
            </div>
        </div>
    );
}