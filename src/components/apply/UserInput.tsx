"use client";
import { useState } from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    onValSubmit: (value: string | number | boolean) => void;
}

export default function UserInput({ onValSubmit, ...inputProps }: InputProps) {
    const [value, setValue] = useState("");

    const handleSubmit = () => {
        onValSubmit(value);
        // setValue("");
    };

    return (
        <div className="flex gap-2">
            <input
                placeholder={"Enter answer here"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-auto px-2 py-1"
            />
            <button className="ml-auto" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
}
