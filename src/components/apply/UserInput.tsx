"use client";
import React from "react";
import { Control, Controller, Path, UseFormRegister } from "react-hook-form";
import {
    ApplicationData,
    Major,
    ClassStanding,
    ReferralSource,
} from "@/src/util/dataTypes";
import { QuestionTypeMap } from "@/src/components/apply/FormBody";

export interface InputProps<
    T extends keyof ApplicationData = keyof ApplicationData,
> {
    name: T;
    register: UseFormRegister<ApplicationData>;
    control: Control<ApplicationData>;
    defaultValue?: ApplicationData[T];
    required: boolean;
}

const MAJOR_LABELS: Record<Major, string> = {
    [Major.ComputerScience]: "Computer Science",
    [Major.AppliedComputing]: "Applied Computing",
    [Major.ComputerEngineering]: "Computer Engineering",
    [Major.DataScienceVis]: "Data Science & Visualization",
    [Major.Business]: "Business",
    [Major.OtherSTEM]: "Other STEM",
    [Major.OtherNonSTEM]: "Other Non-STEM",
};

const CLASS_STANDING_LABELS: Record<ClassStanding, string> = {
    [ClassStanding.Freshman]: "Freshman",
    [ClassStanding.Sophomore]: "Sophomore",
    [ClassStanding.Junior]: "Junior",
    [ClassStanding.Senior]: "Senior",
    [ClassStanding.Masters]: "Masters",
    [ClassStanding.RunningStart]: "Running Start",
};

const REFERRAL_SOURCE_LABELS: Record<ReferralSource, string> = {
    [ReferralSource.Discord]: "Discord",
    [ReferralSource.Email]: "Email",
    [ReferralSource.WordOfMouth]: "Word of Mouth",
    [ReferralSource.PhysicalPoster]: "Physical Poster",
    [ReferralSource.ACM]: "ACM",
    [ReferralSource.OtherClub]: "Other Club",
    [ReferralSource.Other]: "Other",
};

const JUDGING_PREFERENCE_LABELS: Record<
    ApplicationData["judgingPreference"],
    string
> = {
    "PRESENTATION STYLE": "Presentation Style",
    "CONFERENCE STYLE": "Conference Style",
    "NO PREFERENCE": "No Preference",
};

const NO_CODE_PREFERENCE_LABELS: Record<
    ApplicationData["noCodePreference"],
    string
> = {
    CODE: "Code",
    "NO CODE": "No Code",
    "NO PREFERENCE": "No Preference",
};

export const INPUT_TYPES: Record<
    keyof QuestionTypeMap,
    React.FC<InputProps>
> = {
    TEXT: TextInput,
    BOOLEAN: BooleanInput,
    MAJOR: SelectInput(MAJOR_LABELS, "Select your major", true),
    CLASS_STANDING: SelectInput(
        CLASS_STANDING_LABELS,
        "Select your class standing",
        true,
    ),
    REFERRAL_SOURCE: SelectInput(
        REFERRAL_SOURCE_LABELS,
        "Select how you heard about us",
        true,
    ),
    JUDGING_PREFERENCE: SelectInput(
        JUDGING_PREFERENCE_LABELS,
        "Select your preference",
        false,
    ),
    NO_CODE_PREFERENCE: SelectInput(
        NO_CODE_PREFERENCE_LABELS,
        "Select your preference",
        false,
    ),
};

function TextInput({ name, register, defaultValue, required }: InputProps) {
    return (
        <div className="flex gap-2">
            <input
                className="field-sizing-content max-w-full overflow-clip"
                defaultValue={(defaultValue as string) || ""}
                placeholder={"Enter answer here"}
                {...register(name as Path<ApplicationData>, {
                    required,
                })}
            />
        </div>
    );
}

function BooleanInput({ name, control, defaultValue, required }: InputProps) {
    return (
        <Controller
            name={name}
            control={control}
            rules={{
                validate: (value) => !required || typeof value === "boolean",
            }}
            defaultValue={defaultValue}
            render={({ field: { onChange, onBlur, value, ref } }) => (
                <div className="flex gap-4" ref={ref}>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="true"
                            checked={value === true}
                            onBlur={onBlur}
                            // We need to convert the string value to a real boolean.
                            // For radio buttons, onChange is only called when they're checked (not unchecked).
                            onChange={() => onChange(true)}
                        />
                        Yes
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="false"
                            checked={value === false}
                            onBlur={onBlur}
                            onChange={() => onChange(false)}
                        />
                        No
                    </label>
                </div>
            )}
        />
    );
}

function SelectInput<T extends string | number>(
    items: Record<T, string>,
    placeholder: string,
    numeric: T extends string ? false : true,
): React.FC<InputProps> {
    function SelectInputInner({
        name,
        register,
        defaultValue,
        required,
    }: InputProps) {
        return (
            <select
                className="px-2 py-1"
                defaultValue={(defaultValue as T) ?? ""}
                {...register(name as Path<ApplicationData>, {
                    required,
                    valueAsNumber: numeric,
                })}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {Object.entries(items).map(([value, label]) => (
                    <option key={value} value={value}>
                        {label as string}
                    </option>
                ))}
            </select>
        );
    }

    return SelectInputInner;
}
