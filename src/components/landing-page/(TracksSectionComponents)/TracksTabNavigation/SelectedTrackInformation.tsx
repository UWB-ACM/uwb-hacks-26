import { RefObject } from "react";

import { DisplayTrack } from "@/src/components/landing-page/(TracksSectionComponents)/tracks";

type SelectedTrackInformationProps = {
    selectedTrackRef: RefObject<HTMLDivElement | null>;
    selectedTrack: DisplayTrack;
};

export default function SelectedTrackInformation({
    selectedTrackRef,
    selectedTrack,
}: SelectedTrackInformationProps) {
    if (!selectedTrack) {
        return (
            <div
                ref={selectedTrackRef}
                className="font-bold text-[#0078d0] text-center text-xl md:text-2xl"
            >
                Coming soon on Friday, April 24th 2026!
            </div>
        );
    }

    return (
        <div ref={selectedTrackRef} className="space-y-4 p-4 px-10 md:p-12">
            <div>
                <p className="font-h2 font-bold text-[#0078d0] tracking-wider text-center text-xl md:text-2xl">
                    {selectedTrack.question}
                </p>
                <p className="mx-auto text-center md:w-3/4 md:text-xl text-[#0078d0]">
                    {selectedTrack.description}
                </p>
                <p className="mx-auto text-center font-bold font-h2 text-lg md:text-xl text-[#49B2F8]">
                    Example: {" " + selectedTrack.example}
                </p>
            </div>
        </div>
    );
}
