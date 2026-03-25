"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

import CloudSlideIn from "./(AboutSectionComponents)/CloudSlideIn";
import ParticipantsCloud from "@/public/about/ParticipantsCloud.svg";
import SubmittedProjectsCloud from "@/public/about/SubmittedProjectsCloud.svg";
import MOHEventsCloud from "@/public/about/MOHEventsCloud.svg";
import WeekendEventsCloud from "@/public/about/WeekendEventsCloud.svg";

import FlyingCarWithBanner from "@/src/components/landing-page/(AboutSectionComponents)/FlyingCarWithBanner";

import CitySkyline from "@/public/about/skyline.png";
import Grass from "@/public/Grass.png";
import Bushes from "@/public/about/Bushes.png";
import FlowerBushes from "@/public/about/FlowerBushes.png";
import Panel from "./(AboutSectionComponents)/Panel/Panel";
import PanelHeader from "./(AboutSectionComponents)/Panel/Header";
import PanelContent from "./(AboutSectionComponents)/Panel/Content";
import Link from "next/link";

import { actionClaimEasterEgg1010 } from "@/src/util/actions/transactions";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/src/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";

export default function AboutSection() {
    // Track pressed state (clouds in order).
    const pressedRef = useRef([false, false, false, false]);
    const [easterEggPopup, setEasterEggPopup] = useState<
        "success" | "not-signed-in"
    >("success");
    const [easterEggOpen, setEasterEggOpen] = useState(false);
    const claimingRef = useRef(false);

    const checkPattern = useCallback(async () => {
        const pressed = pressedRef.current;
        console.log("Pressed:", pressed);
        // 1010 pattern
        if (pressed[0] && !pressed[1] && pressed[2] && !pressed[3]) {
            if (claimingRef.current) return;
            claimingRef.current = true;

            const result = await actionClaimEasterEgg1010();
            if (result === "success") {
                setEasterEggPopup("success");
                setEasterEggOpen(true);
            } else if (result === null) {
                setEasterEggPopup("not-signed-in");
                setEasterEggOpen(true);
            } else {
                // If they already claimed it, do nothing, since they
                // already received their reward.
                setEasterEggOpen(false);
            }

            claimingRef.current = false;
        }
    }, []);

    const pressHandler = useCallback(
        (index: number) => (pressed: boolean) => {
            pressedRef.current[index] = pressed;
            // Don't want it to trigger from them expiring, only
            // the user intentionally pressing the right combo.
            if (pressed) checkPattern();
        },
        [checkPattern],
    );

    return (
        <div className="bg-[linear-gradient(180deg,#1382DC_0%,#16C2F7_50%,#C3EFFE_100%)]">
            {/* Statistics */}
            <div className="mt-[10vmin] space-y-[8vmin] xl:space-y-[4vmin]">
                <CloudSlideIn
                    cloudImage={ParticipantsCloud}
                    alt={"300+ Hackers"}
                    position={"left"}
                    padding={"15%"}
                    onPressChange={pressHandler(0)}
                />
                <CloudSlideIn
                    cloudImage={SubmittedProjectsCloud}
                    alt={"88 Submitted Projects"}
                    position={"right"}
                    padding={"21%"}
                    onPressChange={pressHandler(1)}
                />
                <CloudSlideIn
                    cloudImage={MOHEventsCloud}
                    alt={"11 Month of Hacking Events"}
                    position={"left"}
                    padding={"18%"}
                    onPressChange={pressHandler(2)}
                />
                <CloudSlideIn
                    cloudImage={WeekendEventsCloud}
                    alt={"14 Hackathon Weekend Events"}
                    position={"right"}
                    padding={"16%"}
                    onPressChange={pressHandler(3)}
                />
            </div>

            <FlyingCarWithBanner />

            {/* City Skyline and Grass */}
            <div className="w-full relative">
                <Image
                    src={CitySkyline}
                    alt=""
                    className="w-full -translate-y-3 md:-translate-y-5 lg:-translate-y-10"
                    sizes="100vw"
                />
                <Image
                    src={Grass}
                    alt=""
                    className="w-full h-1/2 absolute bottom-0"
                    sizes="100vw"
                />
            </div>
            {/* Flower bushes */}
            <div className="w-full bottom-0 left-0 bg-[#0d83db]">
                <div className="bg-[#bebebe]">
                    <br></br>
                    <br></br>
                </div>
                <div>
                    <br></br>
                </div>
                <div className="flex justify-center w-full bottom-0 left-0">
                    <div className="flex w-[120vw] shrink-0">
                        <Image
                            src={FlowerBushes}
                            alt=""
                            className="w-1/2 h-auto sm:translate-x-5"
                            sizes="100vw"
                        />
                        <Image
                            src={FlowerBushes}
                            alt=""
                            className="w-1/2 h-auto "
                            sizes="100vw"
                        />
                    </div>
                </div>
            </div>
            {/* UWB ACM Descriptor Container */}
            <Panel
                id="uwbacmDescriptionPanel"
                className="flex flex-col items-center text-center text-white bg-[#bebebe] font-glacial-indifference"
            >
                <PanelHeader
                    parentPanelId="hackeroonsPanel"
                    as="h1"
                    isSectionHeader
                    className="bg-[#bebebe] font-glacial-indifference font-bold text-shadow-lg/15"
                >
                    UWB Association for Computing Machinery
                </PanelHeader>
                <PanelContent
                    parentPanelId="hackeroonsPanel"
                    className="static px-6 pb-12 pt-0 md:px-20 md:pb-6 md:pt-0 sm:text-xl md:text-2xl"
                >
                    <div className="text-shadow-lg/15">
                        UWB ACM is a chapter of the Association of Computing
                        Machinery at UWB dedicated to creating events and
                        providing insight into academics, research, and careers
                        related to Computer Science. Learn more in our Discord!
                    </div>
                    <Link
                        className="mx-auto w-fit mt-5 sm:mb-2 md:mb-15 bg-white hover:bg-gray-100 text-[#089719] text-md sm:text-base md:text-2xl lg:text-3xl font-bold sm:py-2 md:py-3 px-6 sm:px-12 md:px-20 rounded-full flex items-center justify-center"
                        href="https://discord.gg/eZCm7XfJd7"
                        target="_blank"
                    >
                        DISCORD
                    </Link>

                    {/* Bushes appear over Discord button */}
                    <div className="flex justify-center w-full absolute bottom-0 left-0">
                        <div className="flex w-[120vw] shrink-0">
                            <Image
                                src={Bushes}
                                alt=""
                                className="w-1/2 h-auto sm:translate-x-5"
                                sizes="100vw"
                            />
                            <Image
                                src={Bushes}
                                alt=""
                                className="w-1/2 h-auto "
                                sizes="100vw"
                            />
                        </div>
                    </div>
                </PanelContent>
            </Panel>
        </div>
    );
}
