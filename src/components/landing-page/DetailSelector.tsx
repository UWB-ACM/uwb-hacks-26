import React from "react";
import { useState } from "react";

type DetailItem = {
    id: string;
    header: React.ReactNode;
    content: React.ReactNode;
};

type DetailPanelProps = {
    items: DetailItem[];
};

export default function DetailSelector({ items }: DetailPanelProps) {
    const [selectedId, setSelectedId] = useState<string>(items[0]?.id);
    const selectedItem = items.find((c) => c.id === selectedId);

    return (
        <div className="grid auto-rows-auto">
            <div className="flex w-full justify-evenly overflow-auto">
                {items.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setSelectedId(item.id)}
                        className={`${
                            selectedId === item.id
                                ? "bg-blue-100"
                                : "hover:bg-gray-100"
                        }`}
                    >
                        {item.header}
                    </div>
                ))}
            </div>
            <div>{selectedItem?.content}</div>
        </div>
    );
}
