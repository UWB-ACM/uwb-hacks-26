"use client";

import { Project } from "@/src/util/dataTypes";
import ProjectCard from "@/src/components/dashboards/judge/ProjectCard";

export function JudgingPage({ projects }: { projects: Project[] }) {
    if (projects.length === 0) {
        return <div>Waiting for Assignments...</div>;
    } else {
        return (
            <div className="w-full grow p-8 overflow-scroll overflow-x-hidden grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        );
    }
}
