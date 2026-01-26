"use client";

import { useState } from "react";
import FormBody from "./FormBody";
import Image from "next/image";
import GrassBackground from "@/public/Grass.png";
import { ApplicationData } from "@/src/util/dataTypes";
import { actionSaveApplication } from "@/src/util/actions/application";
import ConfirmSubmit from "./ConfirmSubmit";

export default function ApplicationForm({
    initialApp,
}: {
    initialApp: ApplicationData | null;
}) {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit = async (
        data: ApplicationData,
        resumeFile: File | null,
        deleteResume: boolean,
    ) => {
        const formData = new FormData();
        formData.set("applicationData", JSON.stringify(data));
        if (resumeFile) formData.set("resume", resumeFile);
        if (deleteResume) formData.set("deleteResume", "true");

        await actionSaveApplication(formData);
        setIsSubmitted(true);
    };

    return (
        <div className="bg-blue-300">
            {!isSubmitted ? (
                <FormBody initialApp={initialApp} onSubmit={onSubmit} />
            ) : (
                <ConfirmSubmit />
            )}

            {/* Background grass */}
            <div className="relative z-0 mt-4 md:mt-6 lg:mt-8">
                <Image
                    src={GrassBackground}
                    alt=""
                    className="absolute z-0 bottom-0 w-full pointer-events-none"
                />
            </div>
        </div>
    );
}
