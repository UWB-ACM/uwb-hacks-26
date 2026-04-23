"use client";

import { Project } from "@/src/util/dataTypes";
import ProjectCard from "@/src/components/dashboards/judge/ProjectCard";
import Header from "@/src/components/header/Header";

const HEADER_LINKS = [{ id: "Home", name: "Home", url: "/" }];

export function JudgingPage({
    projects,
}: {
    projects: Array<Project & { completedAt: Date | null }>;
}) {
    const ANY_PROJECTS = projects.length === 0;

    return (
        <div className="w-full min-h-full flex flex-col">
            <Header links={HEADER_LINKS} />
            <h1 className="font-edge-of-the-galaxy text-5xl text-[#ffffff] text-center mt-8">
                Judge Portal
            </h1>

            {ANY_PROJECTS ? (
                <div className="flex justify-center">
                    <p className="mt-4 font-h1 text-3xl text-[#39a8f1] text-center w-[90%] md:w-[80%]">
                        Waiting For Assignments...
                    </p>
                </div>
            ) : (
                <div className="grow p-8 overflow-scroll overflow-x-hidden grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            completedAt={project.completedAt}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
