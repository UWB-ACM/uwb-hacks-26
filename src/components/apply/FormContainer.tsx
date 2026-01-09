"use client";

import React, { useState } from "react";
import Bubble from "./Bubble";
import UserInput from "./UserInput";
import QuestionBubble from "./QuestionBubble";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import Image from "next/image";

// potentially move to a constants.ts file
const DESCRIPTION = "Welcome to UWB Hacks 2026!\n Please fill out this form!";
const QUESTIONS = [
    "What is your first name?",
    "What is your last name?",
    "What is your major?", // multi-choice
    "What school/university do you attend?",
    "What is your class standing?", // multi-choice
    "How did you hear about UWB Hacks 2026?", // multi-choice
    "Do you intend to participate in the week of hacking?",
    "Do you have a team?", // yes/no, reveal new question
    "Please list your team members if so.", // list/multiple custom answers
    "We will send participants notifcations to coordinate the event. What is your phone number?",
    "We will send participants notifcations to coordinate the event. What is your Discord username?",
    "What is your judging style preference?", // multi-choice
    "Do you plan to make a code or no-code project?", // multi-choice
    "Have you attended UWB Hacks before?", // yes/no
    "Please indicate your previous hackathon experience", // multi-choice
    "Please provide a link to your GitHub/portfolio",
];

export default function ApplicationForm() {
    const [currentIndex, setCurrentIndex] = useState(0); // used for displaying the next unanswered question
    const [answers, setAnswers] = useState<string[]>([]); // index used to edit previous answers

    const handleSubmit = (index: number, answer: string | number | boolean) => {
        // if (!answer.trim()) return;

        console.log("User answered:", answer, ' for "', QUESTIONS[index], '"');
        setCurrentIndex((prev) => prev + 1);
    };

    const updateAnswer = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const isFinished = currentIndex >= QUESTIONS.length;

    return (
        <div className="font-opensans w-full min-h-screen flex flex-col">
            <main className="grow w-full max-w-5xl mx-auto px-4 py-8 md:px-6 md:py-12">
                <ParallaxProvider>
                    <Parallax
                        speed={-30}
                        className="absolute w-full h-full z-[-3] bottom-[40px] overflow-hidden"
                    >
                        {/* <Image
                            src={"/placeholder.svg"}
                            priority
                            alt=""
                            className="absolute object-cover w-full h-full overflow-hidden"
                        /> */}
                    </Parallax>

                    <Bubble>{DESCRIPTION}</Bubble>

                    {QUESTIONS.slice(0, currentIndex + 1).map((q, i) => (
                        <QuestionBubble
                            key={i}
                            question={q}
                            onSubmit={(answer) => handleSubmit(i, answer)}
                        />
                    ))}
                </ParallaxProvider>
            </main>
        </div>
    );
}
