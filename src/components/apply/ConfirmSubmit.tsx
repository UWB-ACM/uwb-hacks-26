"use client";

import { useEffect } from "react";
import Image from "next/image";
import Cloud3Background from "@/public/Cloud3-Background.png";

export default function ConfirmSubmit() {
    return (
        <div className="min-h-screen flex items-center justify-center relative">
            {/* Left Cloud */}
            <Image
                src={Cloud3Background}
                alt=""
                className="absolute z-0 top-20 -left-20 md:-left-20 lg:-left-16 scale-x-[-1] opacity-40 w-1/2 md:w-1/3 lg:w-1/4"
            />

            {/* Right Cloud */}
            <Image
                src={Cloud3Background}
                alt=""
                className="absolute z-0 bottom-40 right-3 md:right-2 lg:right-1 opacity-40 w-1/2 md:w-1/3 lg:w-1/4"
            />

            {/* Submission confirmation message */}
            {/* A subcontainer is used to ensure the is displayed over the clouds */}
            <div className="z-10">
                <h1 className="text-center text-3xl md:text-4xl font-bold mb-4 font-sans">
                    Thank you for submitting your application!
                </h1>
                <p className="mt-4 text-sm sm:text-lg md:text-xl lg:text-2xl text-center">
                    See you for UWB Hacks 2026: Hacks the Future
                </p>

                <p className="m-2 text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-center">
                    Friday, April 24 - Sunday, April 26, 2026
                </p>
            </div>
        </div>
    );
}
