"use client";

import BigCloud from "@/public/clouds/BigCloud.png";
import Cloud2 from "@/public/clouds/Cloud2.png";
import Cloud4 from "@/public/clouds/Cloud4.png";

import Image from "next/image";
import UWBHacks2025Snapshot from "./UWBHacks2025Snapshot";

import { motion } from "motion/react";
import FileDownload from "./FileDownload";

export default function UWBHacksIntroSection() {
    return (
        <section
            className="flex flex-col justify-between"
            style={{ height: "calc(100vh - 112px)" }}
        >
            <div className="relative h-full grid place-content-center overflow-x-hidden">
                {/* Floating clouds */}
                <motion.div
                    className="absolute top-1/5 lg:top-1/6 xl:top-1/8 left-0 w-1/2 md:w-1/3 xl:w-1/4"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100vw" }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "linear",
                    }}
                >
                    <Image src={Cloud2} alt="" className="w-full opacity-35" />
                </motion.div>

                <motion.div
                    className="absolute bottom-1/6 lg:bottom-1/6 xl:bottom-1/8 right-0 w-1/2 md:w-1/3 xl:w-1/4"
                    initial={{ x: "100%" }}
                    animate={{ x: "-100vw" }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "linear",
                    }}
                >
                    <Image src={Cloud4} alt="" className="w-full opacity-35" />
                </motion.div>

                <div className="w-[80vw] max-w-[1000px] mx-auto text-center">
                    <h2 className="font-edge-of-the-galaxy text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-wider md:tracking-widest">
                        The UWB Hacks team is proud to hold UWB Hacks for our
                        10th year!
                    </h2>

                    <div className="flex flex-col md:flex-row items-center mt-[2vw] gap-[4vw] opacity-90">
                        <p className="md:w-1/2 text-sm md:text-base lg:text-lg">
                            UWB Hacks is a 36-hour hackathon hosted by the ACM
                            University of Washington Bothell (UWB). It is the{" "}
                            <span className="font-bold">
                                largest hackathon on the UWB campus
                            </span>
                            , and{" "}
                            <span className="font-bold">
                                one of the largest in Washington State
                            </span>
                            .
                        </p>

                        <div className="md:w-1/2 flex flex-col">
                            <p className="text-lg md:text-xl lg:text-2xl">
                                UWB Hacks 2025 Snapshot
                            </p>
                            <UWBHacks2025Snapshot />
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative z-10 overflow-x-clip">
                <Image
                    src={BigCloud}
                    alt=""
                    className="h-auto max-w-none w-[150vw] md:w-[125vw] -translate-x-[25vw] md:-translate-x-[12.5vw]"
                />
                <div className="absolute bottom-0 w-full h-1/3 flex">
                    <FileDownload
                        filePath="/sponsor-page/sponsorship-one-pager.pdf"
                        fileName="UWB Hacks 2026 Sponsorship One Pager"
                        content="Sponsorship One Pager"
                    />
                    <FileDownload
                        filePath="/sponsor-page/sponsorship-packet.pdf"
                        fileName="UWB Hacks 2026 Sponsorship Packet"
                        content="Sponsorship Info Packet"
                    />
                </div>
            </div>
        </section>
    );
}
