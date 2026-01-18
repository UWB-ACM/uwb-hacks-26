import React, { PropsWithChildren } from "react";

export interface BubbleProps {
    hidden?: boolean;
    side: "left" | "right";
}

export default function Bubble({
    children,
    side,
    hidden,
}: PropsWithChildren<BubbleProps>) {
    const hide = hidden ? "display-none w-0 h-0" : "";
    const positioning = side === "left" ? "float-left" : "float-right";
    let transform;
    if (hidden) {
        if (side === "left") transform = "translate-x-[-150%]";
        else transform = "translate-x-[150%]";
    } else {
        transform = "translate-x-[0%]";
    }

    return (
        <div className={`w-full overflow-hidden ${hide}`}>
            <div
                className={`bg-white text-black border-2 border-black rounded-full px-4 py-2 m-4 transition-transform duration-300 ease-in-out ${positioning} ${transform}`}
            >
                {children}
            </div>
        </div>
    );
}
