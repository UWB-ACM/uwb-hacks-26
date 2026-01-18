"use client";

import { useState, useRef, useEffect } from "react";
import Bubble from "./Bubble";
import QuestionBubble from "./QuestionBubble";
import {
    ApplicationData,
    Major,
    ClassStanding,
    ReferralSource,
} from "@/src/util/dataTypes";
import { useForm } from "react-hook-form";
import { INPUT_TYPES } from "@/src/components/apply/UserInput";

const DESCRIPTION = "Welcome to UWB Hacks 2026!\n Please fill out this form!";

/**
 * The details for each question.
 * This doesn't define order, which is specified in `QUESTION_ORDER` below.
 * All items are required unless otherwise specified.
 *
 * The key here specifies the key in `ApplicationData` where the answer should
 * be stored, and also uniquely identifies the question. Type corresponds to the
 * type name in `QuestionTypeMap`, which maps to the same type specified in `ApplicationData`.
 */
const QUESTIONS = {
    name: { text: "What is your full name?", type: "TEXT" },
    email: { text: "What is your email address?", type: "TEXT" },
    major: { text: "What is your major?", type: "MAJOR" },
    school: { text: "What school/university do you attend?", type: "TEXT" },
    classStanding: {
        text: "What is your class standing?",
        type: "CLASS_STANDING",
    },
    referralSource: {
        text: "How did you hear about UWB Hacks 2026?",
        type: "REFERRAL_SOURCE",
    },
    attendingWeekOfHacking: {
        text: "Do you intend to participate in the week of hacking?",
        type: "BOOLEAN",
    },
    teamMembers: {
        text: "Please list your team members, or leave blank if you're looking for a team.",
        type: "TEXT",
        required: false,
    },
    phone: {
        text: "We will send participants notifications to coordinate the event. What is your phone number?",
        type: "TEXT",
    },
    discordUsername: {
        text: "We will send participants notifications to coordinate the event. What is your Discord username?",
        type: "TEXT",
    },
    judgingPreference: {
        text: "What is your judging style preference?",
        type: "JUDGING_PREFERENCE",
    },
    goals: {
        text: "What are your personal goals for attending the hackathon?",
        type: "TEXT",
    },
    noCodePreference: {
        text: "Do you plan to make a code or no-code project?",
        type: "NO_CODE_PREFERENCE",
    },
    previousAttendee: {
        text: "Have you attended UWB Hacks before?",
        type: "BOOLEAN",
    },
    hackathonExperience: {
        text: "Please indicate your previous hackathon experience.",
        type: "TEXT",
    },
    portfolioLink: {
        text: "Please provide a link to your GitHub/portfolio.",
        type: "TEXT",
    },
} as const satisfies Record<
    keyof ApplicationData,
    { text: string; type: keyof QuestionTypeMap; required?: boolean }
>;

/**
 * The order in which questions from QUESTIONS will be displayed.
 */
const QUESTION_ORDER: (keyof ApplicationData)[] = [
    "name",
    "email",
    "major",
    "school",
    "classStanding",
    "referralSource",
    "attendingWeekOfHacking",
    "teamMembers",
    "phone",
    "discordUsername",
    "judgingPreference",
    "noCodePreference",
    "previousAttendee",
    "hackathonExperience",
    "goals",
    "portfolioLink",
];

/**
 * Converts between type names in runtime and their corresponding
 * TypeScript types.
 */
export type QuestionTypeMap = {
    TEXT: string;
    BOOLEAN: boolean;
    MAJOR: Major;
    CLASS_STANDING: ClassStanding;
    REFERRAL_SOURCE: ReferralSource;
    JUDGING_PREFERENCE: ApplicationData["judgingPreference"];
    NO_CODE_PREFERENCE: ApplicationData["noCodePreference"];
};

export default function FormBody({
    initialApp,
    onSubmit,
}: {
    initialApp: ApplicationData | null;
    onSubmit: (data: ApplicationData) => void;
}) {
    // Used for displaying the next unanswered question
    const [currentIndex, setCurrentIndex] = useState(0);
    const isFinished = currentIndex >= QUESTION_ORDER.length;

    // Used for dynamic scrolling
    const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ApplicationData>();

    // Auto-scroll form
    useEffect(() => {
        const el = questionRefs.current[currentIndex];
        el?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }, [currentIndex]);

    return (
        <div className="relative flex flex-col w-full min-h-screen max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 pb-[35vh] md:pb-[40vh]">
            <div className="flex-grow w-full max-w-5xl mx-auto px-4 py-8 md:px-6 md:py-12">
                {/* Description always displays */}
                <Bubble side="left">{DESCRIPTION}</Bubble>

                {/* Display each question */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {QUESTION_ORDER.map((q, i) => {
                        const QuestionComponent =
                            INPUT_TYPES[QUESTIONS[q].type];

                        return (
                            // Dummy div used for autoscroll
                            <div
                                key={q}
                                ref={(el) => {
                                    questionRefs.current[i] = el;
                                }}
                            >
                                <QuestionBubble
                                    question={QUESTIONS[q].text}
                                    hidden={i > currentIndex}
                                >
                                    <QuestionComponent
                                        name={q}
                                        register={register}
                                        control={control}
                                        defaultValue={initialApp?.[q]}
                                        required={
                                            "required" in QUESTIONS[q]
                                                ? (QUESTIONS[q]
                                                      .required as boolean)
                                                : true
                                        }
                                    />

                                    {errors[q] && (
                                        <p className="text-red-500 text-sm ml-3">
                                            Answer required
                                        </p>
                                    )}
                                </QuestionBubble>

                                <Bubble side="right" hidden={i > currentIndex}>
                                    <button
                                        className="ml-auto"
                                        onClick={(e) => {
                                            // Something (either react-hook-form or the browser) is
                                            // moving focus to the next input field when this button is clicked.
                                            // This breaks the animation, so disable it.
                                            e.preventDefault();

                                            // Don't allow continuing while there are errors.
                                            // TODO: Maybe display the error?
                                            if (errors[q] != null) return;

                                            // Make sure we don't go backwards.
                                            setCurrentIndex((curIdx) =>
                                                Math.max(curIdx, i + 1),
                                            );
                                        }}
                                    >
                                        Next
                                    </button>
                                </Bubble>
                            </div>
                        );
                    })}

                    <Bubble side="left" hidden={!isFinished}>
                        <input type="submit" value="Submit" />
                    </Bubble>
                </form>
            </div>
        </div>
    );
}
