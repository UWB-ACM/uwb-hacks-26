"use client";

import { Project } from "@/src/util/dataTypes";
import ProjectCard from "@/src/components/dashboards/judge/ProjectCard";
import Header from "@/src/components/header/Header";

export function JudgingPage({ projects }: { projects: Project[] }) {
    if (projects.length === 0) {
        return (
            <div className="w-full min-h-full flex flex-col">
                <Header
                    links={[
                        {
                            id: "about",
                            name: "About",
                            url: "/#about",
                        },
                        {
                            id: "tracks",
                            name: "Tracks",
                            url: "/#tracks",
                        },
                        {
                            id: "schedule",
                            name: "Schedule",
                            url: "/#schedule",
                        },
                        {
                            id: "faq",
                            name: "FAQ",
                            url: "/#faq",
                        },
                        {
                            id: "dashboard",
                            name: "Dashboard",
                            url: "/dashboard",
                        },
                    ]}
                />
                <h1 className="font-edge-of-the-galaxy text-5xl text-[#2886c4] text-center mt-8">
                    Judge Portal
                </h1>
                <div className="flex justify-center">
                    <p className="mt-4 font-h1 text-3xl text-[#39a8f1] text-center w-[90%] md:w-[80%]">
                        Waiting For Assignments...
                    </p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="w-full min-h-full flex flex-col">
                <Header
                    links={[
                        { id: "about", name: "About", url: "/#about" },
                        { id: "tracks", name: "Tracks", url: "/#tracks" },
                        { id: "schedule", name: "Schedule", url: "/#schedule" },
                        { id: "faq", name: "FAQ", url: "/#faq" },
                        {
                            id: "dashboard",
                            name: "Dashboard",
                            url: "/dashboard",
                        },
                    ]}
                />
                <h1 className="font-edge-of-the-galaxy text-5xl text-[#2886c4] text-center mt-8">
                    Judge Portal
                </h1>
                <div className="grow p-8 overflow-scroll overflow-x-hidden grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        );
    }
}
