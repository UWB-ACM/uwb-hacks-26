import { useState, useRef, useEffect } from "react";
import Bubble from "./Bubble";
import QuestionBubble from "./QuestionBubble";
import {
    ApplicationData,
    Major,
    ClassStanding,
    ReferralSource,
} from "@/src/util/dataTypes";
import { FieldErrors, useForm } from "react-hook-form";
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
    resumeType: {
        text: "Upload your resume (optional).",
        type: "RESUME_TYPE",
        required: false,
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
    "resumeType",
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
    RESUME_TYPE: string | null;
};

export default function FormBody({
    initialApp,
    onSubmit,
}: {
    initialApp: ApplicationData | null;
    onSubmit: (
        data: ApplicationData,
        resumeFile: File | null,
        deleteResume: boolean,
    ) => void;
}) {
    // Used for displaying the next unanswered question
    const [currentIndex, setCurrentIndex] = useState(0);
    const isFinished = currentIndex >= QUESTION_ORDER.length;

    // Holds the selected resume file until form submission
    const resumeFileRef = useRef<File | null>(null);
    // Whether the user explicitly cleared their resume
    const deleteResumeRef = useRef(false);

    // Used for dynamic scrolling
    const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

    const formRef = useRef<HTMLFormElement>(null);
    const {
        register,
        control,
        trigger,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<ApplicationData>({ mode: "onBlur" });

    const scrollToError = (errors: FieldErrors<ApplicationData>) => {
        const first = QUESTION_ORDER.flatMap((q, i) =>
            q in errors ? [i] : [],
        )[0];
        if (!first) return;

        const el = questionRefs.current[first];
        if (!el) return;

        if (el instanceof HTMLElement) {
            el.scrollIntoView({ behavior: "smooth", block: "end" });
            el.focus();
        }
    };

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
                <form
                    onSubmit={
                        // ESLint is confused here, since both onSubmit
                        // and onError are only called on user input, not during
                        // render (which the lint is worried about).
                        handleSubmit(
                            // eslint-disable-next-line react-hooks/refs
                            (data) =>
                                onSubmit(
                                    data,
                                    resumeFileRef.current,
                                    deleteResumeRef.current,
                                ),
                            // eslint-disable-next-line react-hooks/refs
                            scrollToError,
                        )
                    }
                    ref={formRef}
                >
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
                                        setError={setError}
                                        clearErrors={clearErrors}
                                        defaultValue={initialApp?.[q]}
                                        required={
                                            "required" in QUESTIONS[q]
                                                ? (QUESTIONS[q]
                                                      .required as boolean)
                                                : true
                                        }
                                        onFileSelect={(file) => {
                                            resumeFileRef.current = file;
                                        }}
                                        onDeleteResume={(deleted) => {
                                            deleteResumeRef.current = deleted;
                                        }}
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
                                        onClick={async (e) => {
                                            // Something (either react-hook-form or the browser) is
                                            // moving focus to the next input field when this button is clicked.
                                            // This breaks the animation, so disable it.
                                            e.preventDefault();

                                            // Validate all currently shown fields so we can
                                            // stop the user immediately if there's an error.
                                            const formValid = await trigger(
                                                QUESTION_ORDER.slice(
                                                    0,
                                                    currentIndex + 1,
                                                ),
                                            );
                                            if (!formValid) {
                                                // TODO: Maybe display the error?
                                                // This isn't exactly right, since errors still points
                                                // to the old list of errors. But the only item that should
                                                // be missing is the last form input, so scrolling isn't a
                                                // big deal.
                                                // Maybe there's some way to request the latest errors from
                                                // react-hook-form, though?
                                                scrollToError(errors);
                                                return;
                                            }

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
