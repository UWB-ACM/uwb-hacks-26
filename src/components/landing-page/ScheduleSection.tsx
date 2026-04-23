import React, { useState, useRef, useLayoutEffect } from "react";

import Image from "next/image";
import ScheduleCloudTop from "@/public/scheduleSection/ScheduleCloudTop.svg";
import ScheduleCloudBody from "@/public/scheduleSection/ScheduleCloudBody.svg";
import ScheduleCloudBottom from "@/public/scheduleSection/ScheduleCloudBottom.svg";

import Panel from "./(AboutSectionComponents)/Panel/Panel";
import PanelHeader from "./(AboutSectionComponents)/Panel/Header";
import PanelContent from "./(AboutSectionComponents)/Panel/Content";

import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";

import { schedule, DaySchedule } from "./(ScheduleSectionComponents)/Schedule";
import EventItem from "./(ScheduleSectionComponents)/EventItem";
import gsap from "gsap";

const ScheduleSection: React.FC = () => {
    const [day, setDay] = useState<1 | 2 | 3>(() => {
        const currDate = new Date();

        // If the current date is...
        // - before, after, or on the first day of the hackthon, set to 1 (1st day of the hackathon)
        // - before the third day of the hackthon (April 26, midnight), set to 2 (2nd day of hackathon)
        // - otherwise, set to 3 (3rd day of hackathon)
        const apr25 = new Date(2026, 3, 25, 0, 0, 0, 0);
        const apr26 = new Date(2026, 3, 26, 0, 0, 0, 0);
        const apr27 = new Date(2026, 3, 27, 0, 0, 0, 0);

        if (currDate < apr25 || currDate >= apr27) {
            return 1;
        } else if (currDate < apr26) {
            return 2;
        } else {
            return 3;
        }
    });

    const daySchedule: DaySchedule = schedule[day];

    const handleSwitchDay = (direction: "prev" | "next") => {
        const el = document.getElementById("scheduleSectionPanel");
        if (el) {
            window.scrollTo({
                top: el.getBoundingClientRect().top + window.scrollY - 100,
                behavior: "smooth",
            });
        }

        let newDay = day + (direction == "prev" ? -1 : 1);

        if (newDay == 0) {
            newDay = 3;
        } else if (newDay == 4) {
            newDay = 1;
        }

        setDay(newDay as 1 | 2 | 3);
    };

    const scheduleContainerRef = useRef<HTMLDivElement | null>(null);
    const prevHeightRef = useRef<number>(0);

    useLayoutEffect(() => {
        const el = scheduleContainerRef.current;
        if (!el) return;

        const newHeight = el.scrollHeight;

        if (prevHeightRef.current > 0 && prevHeightRef.current !== newHeight) {
            gsap.fromTo(
                el,
                { height: prevHeightRef.current },
                {
                    height: newHeight,
                    duration: 0.2,
                    ease: "power2.inOut",
                    onComplete: () => {
                        gsap.set(el, { height: "auto" });
                    },
                },
            );
        }

        prevHeightRef.current = newHeight;
    }, [day]);

    return (
        <div className="mx-auto w-[90%] max-w-[850px]">
            <Image
                src={ScheduleCloudTop}
                alt=""
                className="relative z-5 w-full"
            />
            <div
                ref={scheduleContainerRef}
                className="relative z-0 w-full -translate-y-0.5 px-[15%] select-none"
            >
                <Image
                    src={ScheduleCloudBody}
                    alt=""
                    fill
                    className="absolute top-0 object-fill"
                />

                <Panel id={"scheduleSectionPanel"} className="overflow-visible">
                    <PanelHeader
                        parentPanelId={"scheduleSectionPanel"}
                        as="h3"
                        isSectionHeader
                        className="font-glacial-indifference font-semibold text-[#0078d0] px-0 md:px-0 pb-2 md:pb-2 flex justify-between items-center"
                    >
                        <button onClick={() => handleSwitchDay("prev")}>
                            <FaLongArrowAltLeft className="h-[30px] md:h-[45px] w-[30px] md:w-[45px] text-[#0078d0]/40 hover:text-[#0078d0] duration-300" />
                        </button>
                        DAY {day}
                        <button onClick={() => handleSwitchDay("next")}>
                            <FaLongArrowAltRight className="h-[30px] md:h-[45px] w-[30px] md:w-[45px] text-[#0078d0]/40 hover:text-[#0078d0] duration-300" />
                        </button>
                    </PanelHeader>
                    <PanelContent
                        parentPanelId={"scheduleSectionPanel"}
                        className="p-0 md:p-0 pb-4 md:pb-4 flex flex-col gap-y-3"
                    >
                        <div className="w-full flex flex-col gap-y-1 justify-center items-center text-lg lg:text-xl font-bold text-blue-500/60 text-center">
                            <span>( {daySchedule.date} )</span>{" "}
                            <span>{daySchedule.spirit.toUpperCase()}</span>
                        </div>
                        {daySchedule.events.map((e, idx) => (
                            <EventItem key={idx} event={e} />
                        ))}
                        <div className="flex justify-between items-center font-glacial-indifference font-semibold text-[#0078d0] text-lg md:text-xl lg:text-2xl">
                            <button onClick={() => handleSwitchDay("prev")}>
                                <FaLongArrowAltLeft className="h-[30px] md:h-[45px] w-[30px] md:w-[45px] text-[#0078d0]/40 hover:text-[#0078d0] duration-300" />
                            </button>
                            DAY {day}
                            <button onClick={() => handleSwitchDay("next")}>
                                <FaLongArrowAltRight className="h-[30px] md:h-[45px] w-[30px] md:w-[45px] text-[#0078d0]/40 hover:text-[#0078d0] duration-300" />
                            </button>
                        </div>
                    </PanelContent>
                </Panel>
            </div>
            <Image
                src={ScheduleCloudBottom}
                alt=""
                className="relative z-5 w-full -translate-y-0.5"
            />
        </div>
    );
};

export default ScheduleSection;
