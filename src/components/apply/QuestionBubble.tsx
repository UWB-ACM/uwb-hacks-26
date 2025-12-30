import Bubble from "./Bubble";
import UserInput from "./UserInput";

type QuestionBubbleProps = {
    question: string;
    onSubmit: (value: string | number | boolean) => void;
};

export default function QuestionBubble({
    question,
    onSubmit,
}: QuestionBubbleProps) {
    return (
        <>
            <Bubble>
                <div>
                    <p>{question}</p>
                </div>
            </Bubble>
            <Bubble>
                <div>
                    <UserInput onValSubmit={onSubmit} />
                </div>
            </Bubble>
        </>
    );
}
