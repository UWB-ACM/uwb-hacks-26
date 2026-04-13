"use client";

import React from "react";
import Link from "next/link";
import { Project } from "@/src/util/dataTypes";

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <Link href={`/judging/${project.id}`}>
            <div className="flex flex-col items-center p-6 bg-neutral-200 rounded-lg border-4 border-black shadow-comic">
                <p>#{project.id}</p>
                <p>{project.projectTitle}</p>
                <p>{project.mainTrack}</p>
                <p>{project.sideTracks.join(", ")}</p>
            </div>
        </Link>
    );
}
