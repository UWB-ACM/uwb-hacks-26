import React, { RefObject } from "react";

import { DisplayTrack } from "@/src/components/landing-page/TrackSection";

type SelectedTrackInformationProps = {
    selectedTrackRef: RefObject<HTMLDivElement | null>;
    selectedTrack: DisplayTrack;
};

export default function SelectedTrackInformation({
    selectedTrackRef,
    selectedTrack,
}: SelectedTrackInformationProps) {
    return (
        <div ref={selectedTrackRef} className="space-y-4 p-4 px-10 md:p-12">
            <div>
                <p className="font-h2 font-bold text-[#0078d0] tracking-wider text-center text-xl md:text-2xl">
                    {selectedTrack.question}
                </p>
                <p className="mx-auto text-center md:w-3/4 md:text-xl text-[#0078d0]">
                    {selectedTrack.description}
                </p>
            </div>
        </div>
    );
}
