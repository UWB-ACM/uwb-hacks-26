"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
// Panel components
import Panel from "./(AboutSectionComponents)/Panel/Panel";
import PanelContent from "./(AboutSectionComponents)/Panel/Content";
import PanelHeader from "./(AboutSectionComponents)/Panel/Header";

// Mystery Box components / assets
import MysteryBox from "./(TracksSectionComponents)/MysteryBox";
import tracks_data from "./(TracksSectionComponents)/tracks.json";

// Used in Tracks section background
import QuestionMark from "./(TracksSectionComponents)/QuestionMark";

// Tab navigation for tracks
import Tracks from "./(TracksSectionComponents)/TracksTabNavigation/Tracks";

import LivePoll from "./(AboutSectionComponents)/LivePoll";
import { actionSetTracksAnimation } from "@/src/util/actions/animation";

gsap.registerPlugin(ScrollTrigger);

/**
 * Frontend display data for a track (used by landing page).
 */
export interface DisplayTrack {
    /**
     * name of track
     */
    name: string;

    /**
     * question related to track (helps explain tracks goal)
     */
    question: string;

    /**
     * track description
     */
    description: string;

    /**
     * no code example of track
     */
    noCodeExample: string;

    /**
     * low code / code example of track
     */
    lowCodeExample: string;
}

const TracksSection = ({ noTrackAnimation }: { noTrackAnimation: boolean }) => {
    const panelPadding = "py-6 md:py-10";

    // tracks contains all relevant information about each of the tracks
    const tracks: DisplayTrack[] = tracks_data["tracks"];
    const tracksNavRef = useRef<HTMLDivElement | null>(null);
    const selectedTrackRef = useRef<HTMLDivElement | null>(null);
    // const livePollRef = useRef<HTMLDivElement | null>(null);

    return (
        <Panel id="tracksPanel" className={panelPadding} panelColor="white">
            <PanelHeader
                parentPanelId="tracksPanel"
                as="h2"
                className="border-none lg:w-full font-glacial-indifference font-bold bg-transparent pb-3 md:pb-4 lg:pb-6"
                isSectionHeader
            >
                TRACKS
            </PanelHeader>

            <Tracks
                tracks={tracks}
                tracksNavRef={tracksNavRef}
                selectedTrackRef={selectedTrackRef}
            />

            {/* <LivePoll livePollRef={livePollRef} /> */}
        </Panel>
    );
};

export default TracksSection;
