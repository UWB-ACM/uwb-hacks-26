import React from "react";
import { Metadata } from "next";
import Header from "@/src/components/header/Header";

export const metadata: Metadata = {
    title: "Participant Application | UWB Hacks 26",
};

export default async function ApplyPage() {
    return (
        <div className="font-opensans w-full min-h-screen flex flex-col">
            <Header links={[{ id: "about", name: "About", url: "/#about" }]} />

            <main className="grow w-full max-w-5xl mx-auto px-4 py-8 md:px-6 md:py-12">
                <h1 className="font-san-marino-beach text-5xl md:text-6xl text-[#2886c4] text-center mb-4">
                    Apply
                </h1>

                <p className="mt-2 font-h1 text-2xl md:text-3xl text-[#39a8f1] text-center mb-12 max-w-3xl mx-auto">
                    Apply Page
                </p>
            </main>
        </div>
    );
}
