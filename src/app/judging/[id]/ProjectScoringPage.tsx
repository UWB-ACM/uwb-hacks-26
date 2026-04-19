"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Project, JudgingQuestion, JudgingScore } from "@/src/util/dataTypes";
import {
    actionSubmitScore,
    actionCompleteAssignment,
} from "@/src/util/actions/judge";
import Header from "@/src/components/header/Header";

const HEADER_LINKS = [{ id: "Home", name: "Home", url: "/" }];

export default function ProjectScoringPage({
    project,
    questions,
    existingScores,
}: {
    project: Project;
    questions: JudgingQuestion[];
    existingScores: JudgingScore[];
}) {
    const router = useRouter();

    // Seed state from any scores already in the DB so revisiting the page pre-fills inputs.
    const [scores, setScores] = useState<Record<number, number>>(
        Object.fromEntries(existingScores.map((s) => [s.questionId, s.score])),
    );
    const [completing, setCompleting] = useState(false);

    // All questions must have a defined score before the judge can mark complete.
    const allScored =
        questions.length === 0 || questions.every((q) => q.id in scores);

    function handleChange(questionId: number, raw: string) {
        const val = parseInt(raw);
        if (!isNaN(val) && val >= 0 && val <= 10) {
            setScores((prev) => ({ ...prev, [questionId]: val }));
        }
    }

    // Autosave to DB when the judge finishes entering a score for a question.
    function handleBlur(questionId: number) {
        const score = scores[questionId];
        if (score !== undefined) {
            actionSubmitScore(project.id, questionId, score);
        }
    }

    async function handleComplete() {
        setCompleting(true);
        for (const q of questions) {
            if (scores[q.id] !== undefined) {
                await actionSubmitScore(project.id, q.id, scores[q.id]);
            }
        }
        await actionCompleteAssignment(project.id);
        router.push("/judging");
    }

    return (
        <div className="w-full min-h-full flex flex-col">
            <Header links={HEADER_LINKS} />

            <div className="flex flex-col gap-6 p-8 max-w-3xl mx-auto w-full">
                <Link
                    href="/judging"
                    className="font-h2 text-[#ffffff]  w-fit font-bold text-2xl"
                >
                    ← Back to projects
                </Link>

                {/* Project info card */}
                <div className="bg-neutral-200 rounded-lg border-4 border-black shadow-comic p-6">
                    <h1 className="font-bold text-4xl text-[#2886c4] text-center ">
                        {project.projectTitle}
                    </h1>

                    <div className="flex flex-wrap gap-2 mt-3 justify-center">
                        <span className="bg-white border-2 border-black px-3 py-1 rounded-full font-h2 text-sm font-bold">
                            {project.mainTrack}
                        </span>
                        {project.sideTracks.map((track) => (
                            <span
                                key={track}
                                className="bg-white border-2 border-black px-3 py-1 rounded-full font-h2 text-sm font-bold"
                            >
                                {track}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-4 mt-4 flex-wrap">
                        {project.submissionUrl && (
                            <Link
                                href={project.submissionUrl}
                                target="_blank"
                                className="font-h2 text-[#2886c4] underline font-bold"
                            >
                                Devpost →
                            </Link>
                        )}
                        {project.tryUrl && (
                            <Link
                                href={project.tryUrl}
                                target="_blank"
                                className="font-h2 text-[#2886c4] underline"
                            >
                                Demo →
                            </Link>
                        )}
                        {project.videoUrl && (
                            <Link
                                href={project.videoUrl}
                                target="_blank"
                                className="font-h2 text-[#2886c4] underline"
                            >
                                Video →
                            </Link>
                        )}
                    </div>
                </div>

                {/* Scoring questions */}
                {questions.length === 0 ? (
                    <p className="font-h2 text-xl text-neutral-500">
                        Please find a staff member immediately.
                    </p>
                ) : (
                    <div className="flex flex-col gap-4">
                        <h2 className="font-h1 text-2xl text-[#ffffff] text-center text-4xl">
                            Scoring
                        </h2>
                        {questions.map((question) => (
                            <div
                                key={question.id}
                                className="bg-neutral-200 rounded-lg border-4 border-black shadow-comic p-6 flex flex-col gap-3"
                            >
                                <p className="font-h2 text-lg font-bold">
                                    {question.questionText}
                                </p>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="range"
                                            min={0}
                                            max={10}
                                            value={
                                                scores[question.id] !== undefined
                                                    ? scores[question.id]
                                                    : 0
                                            }
                                            onChange={(e) =>
                                                handleChange(
                                                    question.id,
                                                    e.target.value,
                                                )
                                            }
                                            onBlur={() => handleBlur(question.id)}
                                            className="flex-1 accent-[#2886c4] h-3 cursor-pointer"
                                        />
                                        
                                        <span className="font-h2 font-bold text-xl w-8 text-center border-2 border-black rounded bg-white">
                                            {scores[question.id] !== undefined
                                                ? scores[question.id]
                                                : "—"}
                                        </span>
                                    </div>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <button
                    onClick={handleComplete}
                    disabled={!allScored || completing}
                    className="mt-2 font-h2 text-xl bg-[#2886c4] text-white border-4 border-black shadow-comic rounded-lg px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#39a8f1] transition-colors"
                >
                    {completing ? "Submitting..." : "Mark Complete"}
                </button>
            </div>
        </div>
    );
}
