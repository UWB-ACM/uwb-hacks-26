"use client";

import React from "react";
import Link from "next/link";
import { Project } from "@/src/util/dataTypes";

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <Link href={`/judging/${project.id}`} className="h-min">
            <div className="flex flex-col items-center p-6 bg-neutral-200 rounded-lg border-4 border-black shadow-comic">
                <p className="font-bold text-2xl">{project.projectTitle}</p>
                <p>{project.mainTrack}</p>
                <p>{project.sideTracks.join(", ")}</p>
                <p className="text-sm">#{project.id}</p>
            </div>
        </Link>
    );
}
