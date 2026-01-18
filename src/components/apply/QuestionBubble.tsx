import Bubble from "./Bubble";
import { PropsWithChildren } from "react";

type QuestionBubbleProps = {
    question: string;
    hidden: boolean;
};

export default function QuestionBubble({
    question,
    hidden,
    children,
}: PropsWithChildren<QuestionBubbleProps>) {
    return (
        <>
            <Bubble side="left" hidden={hidden}>
                <p>{question}</p>
            </Bubble>
            <Bubble side="right" hidden={hidden}>
                {children}
            </Bubble>
        </>
    );
}
