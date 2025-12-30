// the content displayed in each text bubble
type BubbleProps = {
    children: React.ReactNode;
};

export default function Bubble({ children }: BubbleProps) {
    return (
        <>
            <div className="bg-white text-black border-2 border-black rounded-full px-4 py-2 m-4">
                {children}
            </div>
        </>
    );
}
