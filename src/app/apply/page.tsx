import React from "react";
import { Metadata } from "next";
import Header from "@/src/components/header/Header";
import ApplicationForm from "../../components/apply/FormContainer";

export const metadata: Metadata = {
    title: "Participant Application | UWB Hacks 26",
};

export default function ApplyPage() {
    return (
        <div className="font-opensans bg-blue-300 w-full min-h-screen flex flex-col">
            <Header links={[{ id: "about", name: "About", url: "/#about" }]} />

            <main className="grow w-full max-w-5xl mx-auto px-4 py-8 md:px-6 md:py-12">
                <ApplicationForm></ApplicationForm>
            </main>
        </div>
    );
}
