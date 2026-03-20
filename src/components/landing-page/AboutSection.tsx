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

import { actionClaimEasterEgg1010 } from "@/src/util/actions/transactions";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/src/components/ui/dialog";
import Link from "next/link";
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

            {/* Easter Egg 1010 Popup */}
            <AlertDialog
                open={easterEggOpen}
                onOpenChange={(open) => {
                    setEasterEggOpen(open);
                }}
            >
                <AlertDialogContent className="max-w-[90%] sm:max-w-[425px] z-1000">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center text-2xl font-bold text-[#0d83db]">
                            1010₂ = 10₁₀
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center">
                            Binary{" "}
                            <span className="font-mono font-bold">1010</span> is{" "}
                            <span className="font-bold">10</span> in decimal,
                            just like our{" "}
                            <span className="font-bold text-[#0d83db]">
                                10th annual hackathon!
                            </span>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    {easterEggPopup === "success" ? (
                        <p className="text-center text-green-600 font-semibold">
                            50 Hackeroons added to your account!
                        </p>
                    ) : (
                        <p className="text-center text-amber-600 font-semibold">
                            Sign in, then try again to claim your Hackeroons!
                        </p>
                    )}
                    <AlertDialogFooter className="sm:justify-center">
                        {easterEggPopup === "success" ? (
                            <button
                                className="bg-[#0d83db] hover:bg-[#0a6ab8] text-white font-bold py-2 px-8 rounded-full transition-colors"
                                onClick={() => setEasterEggOpen(false)}
                            >
                                Nice!
                            </button>
                        ) : (
                            <Link href="/api/auth/google">
                                <button className="bg-[#0d83db] hover:bg-[#0a6ab8] text-white font-bold py-2 px-8 rounded-full transition-colors">
                                    Sign In
                                </button>
                            </Link>
                        )}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
