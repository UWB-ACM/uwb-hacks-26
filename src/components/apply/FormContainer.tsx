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

    const onSubmit = async (data: ApplicationData) => {
        await actionSaveApplication(data);
        setIsSubmitted(true);
    };

    return (
        <div className="bg-blue-300">
            {!isSubmitted ? (
                <FormBody
                    initialApp={initialApp}
                    onSubmit={onSubmit}
                ></FormBody>
            ) : (
                <ConfirmSubmit></ConfirmSubmit>
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
