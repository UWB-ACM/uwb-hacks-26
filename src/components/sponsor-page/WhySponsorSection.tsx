"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import Image from "next/image";
import BigCloud from "@/public/clouds/BigCloud.png";
import WhySponsorClouds from "./WhySponsorClouds";
import HallE from "@/public/HALL-E.png";

export default function WhySponsorSection() {
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress: headerEntryScrollProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end 50%"],
    });
    const scale = useTransform(
        headerEntryScrollProgress,
        [0, 0.4, 0.8, 1],
        [0, 1, 1, 0],
    );
    const y = useTransform(
        headerEntryScrollProgress,
        [0, 0.25, 1],
        [-100, -50, 0],
    );

    return (
        <section ref={containerRef} className="relative overflow-x-clip">
            <div className="absolute -top-4 z-8 -left-[25vw] md:-left-[12.5vw] rotate-180">
                <Image
                    src={BigCloud}
                    alt=""
                    className="h-auto max-w-none w-[150vw] md:w-[125vw] -scale-x-[1]"
                />
            </div>

            <motion.h2
                className="sticky top-1/2 z-0 font-edge-of-the-galaxy text-4xl lg:text-5xl text-center tracking-wider md:tracking-widest w-[80vw] max-w-[1000px] mx-auto"
                style={{ scale, y }}
            >
                Why Sponsor UWBHacks?
            </motion.h2>

            {/* Spacer */}
            <div className="w-full h-[35vh] md:h-[55vh] lg:h-[60vh] xl:h-[80vh]" />

            <WhySponsorClouds />

            <div className="relative z-8 -translate-x-[25vw] md:-translate-x-[12.5vw]">
                <motion.div className="z-[-5] absolute bottom-1/3 left-2/5 md:left-1/3 w-1/4 scale-x-[-1]">
                    <Image src={HallE} alt="" className="w-full h-full" />
                </motion.div>

                <Image
                    src={BigCloud}
                    alt=""
                    className="h-auto max-w-none w-[150vw] md:w-[125vw]"
                />
            </div>
        </section>
    );
}
