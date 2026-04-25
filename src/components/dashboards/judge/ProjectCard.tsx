"use client";

import React from "react";
import Link from "next/link";
import { Project } from "@/src/util/dataTypes";

export default function ProjectCard({
    project,
}: {
    project: Project & { completedAt: Date | null };
}) {
    return (
        <Link href={`/judging/${project.id}`} className="h-min">
            <div
                className={`flex flex-col items-center p-6 rounded-lg border-4 border-black shadow-comic ${project.completedAt !== null ? "bg-green-500" : "bg-neutral-200"}`}
            >
                <p className="font-bold text-2xl">{project.projectTitle}</p>
                <p>{project.mainTrack}</p>
                <p>{project.sideTracks.join(", ")}</p>
                <p className="text-sm">#{project.id}</p>
            </div>
        </Link>
    );
}
