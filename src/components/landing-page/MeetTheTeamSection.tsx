import { useState, useEffect, useRef, useCallback } from "react";

// import MeetTheTeamCloud from "./(MeetTheTeamSectionComponents)/MeetTheTeamCloud";
import gsap from "gsap";

import Image from "next/image";
import FlyingCarDesktop from "@/public/clouds/FlyingCarCloud_Desktop.png";
import FlyingCarMobileTablet from "@/public/clouds/FlyingCarCloud_MobileTablet.png";

import Panel from "./(AboutSectionComponents)/Panel/Panel";
import PanelHeader from "./(AboutSectionComponents)/Panel/Header";
import PanelContent from "./(AboutSectionComponents)/Panel/Content";

import { cn } from "@/src/util/utils";
import { LuClock } from "react-icons/lu";

const MeetTheTeamSection = () => {
    const panelStyles =
        "flex flex-col absolute top-0 left-1/2 border-0 translate-y-[40%] md:translate-y-[41%] lg:translate-y-[70%] xl:translate-y-[65%] -translate-x-1/2 w-[78%] md:w-[70%] lg:w-[85%] xl:w-[85%] h-[65%] md:h-[65%] lg:h-[51.5%] xl:h-[54%]";
    const panelHeaderStyles =
        "border-0 lg:border-0 w-full lg:w-full font-glacial-indifference font-semibold text-[#2b3244] p-3 bg-transparent";
    const panelContentStyles = "relative grow flex p-0 md:p-0 overflow-hidden";

    // passed into mobile/tablet and desktop versions as prop to get...
    // - height of panelContent element on desktop
    // - width of panelContent elemnent on mobile/tablet
    const panelContentRef = useRef<HTMLDivElement | null>(null);

    // keeps track of currently selected memberIcon
    // set to null when no one is selected
    const [selectedMemberIdx, setSelectedMemberIdx] = useState<number | null>(
        null,
    );

    // committeeMemberIconsRef references revolving element
    // committeeMemberIconsRef is used by GSAP timeline, tlRef.current, to perform the animation
    const committeeMemberIconsRef = useRef<HTMLDivElement | null>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    const buildTimeline = useCallback(() => {
        const el = committeeMemberIconsRef.current;
        if (!el) {
            tlRef.current?.kill();
            tlRef.current = null;
            return;
        }

        tlRef.current?.kill();
        const isRow = window.getComputedStyle(el).flexDirection === "row";
        const half = isRow ? el.scrollWidth / 2 : el.scrollHeight / 2;
        if (half <= 0) {
            tlRef.current = null;
            return;
        }

        const tl = gsap.timeline({ repeat: -1 });
        tlRef.current = tl;

        if (isRow) {
            gsap.set(el, { x: 0, y: 0 });
            tl.fromTo(el, { x: 0 }, { x: -half, duration: 35, ease: "none" });
        } else {
            gsap.set(el, { x: 0, y: -half });
            tl.fromTo(el, { y: -half }, { y: 0, duration: 40, ease: "none" });
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setSelectedMemberIdx(null);
            tlRef.current?.resume();
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        const el = committeeMemberIconsRef.current;
        if (el) {
            buildTimeline();
            const ro = new ResizeObserver(buildTimeline);
            ro.observe(el);
            return () => {
                window.removeEventListener("resize", handleResize);
                ro.disconnect();
                tlRef.current?.kill();
                tlRef.current = null;
            };
        }

        return () => window.removeEventListener("resize", handleResize);
    }, [buildTimeline]);

    const handleDeselect = useCallback(() => {
        tlRef.current?.resume();
        setSelectedMemberIdx(null);
    }, []);

    const handleClick = (selectedIdx: number) => {
        if (selectedMemberIdx === null || selectedIdx !== selectedMemberIdx) {
            tlRef.current?.pause();
            setSelectedMemberIdx(selectedIdx);
        } else {
            handleDeselect();
        }
    };

    useEffect(() => {
        if (selectedMemberIdx === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleDeselect();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [selectedMemberIdx, handleDeselect]);

    return (
        <div className="mt-[10vmin] relative mx-auto w-[90%] md:w-[75%] lg:w-[80%] xl:w-[60%]">
            {/* conditionally render respective FlyingCar image */}
            <Image
                src={FlyingCarMobileTablet}
                alt=""
                sizes="(min-width: 1280px) 60vw, (min-width: 1024px) 80vw, (min-width: 768px) 75vw, 90vw"
                className="w-full h-full block lg:hidden"
            />

            <Image
                src={FlyingCarDesktop}
                alt=""
                sizes="(min-width: 1280px) 60vw, (min-width: 1024px) 80vw, (min-width: 768px) 75vw, 90vw"
                className="w-full h-full hidden lg:block"
            />

            {/*
                Panel component is absolutely positioned on top of FlyingCar image
                
                safe content area is established via panelStyles variable through all the "translate-y"s, "w-[XX%]"s, and "h-[XX%]"s. makes sure that all content never overflows out of cloud image
            */}
            <Panel id={"meetTheTeamPanel"} className={panelStyles}>
                <PanelHeader
                    parentPanelId={"meetTheTeamPanel"}
                    as={"h2"}
                    className={panelHeaderStyles}
                >
                    MEET THE TEAM
                </PanelHeader>
                <PanelContent
                    parentPanelId={"meetTheTeamPanel"}
                    className={cn(panelContentStyles, "flex-col lg:flex-row")}
                >
                    {/* <MeetTheTeamCloud
                        panelContentRef={panelContentRef}
                        committeeMemberIconsRef={committeeMemberIconsRef}
                        handleClick={handleClick}
                        handleDeselect={handleDeselect}
                        selectedMemberIdx={selectedMemberIdx}
                    /> */}
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <LuClock className="h-[50px] w-[50px] lg:h-[100px] lg:w-[100px]" />
                        <p className="text-center">
                            Stay tuned, the team is on their way!
                        </p>
                    </div>
                </PanelContent>
            </Panel>
        </div>
    );
};

export default MeetTheTeamSection;
