"use client";

import { useState, useRef, useEffect } from "react";

import Panel from "../(AboutSectionComponents)/Panel/Panel";
import PanelHeader from "../(AboutSectionComponents)/Panel/Header";
import PanelContent from "../(AboutSectionComponents)/Panel/Content";

import Image from "next/image";
import FlyingCarMobileTablet from "@/public/clouds/FlyingCarCloud_MobileTablet.png"

import { cn } from "@/src/util/utils";
import Link from "next/link";

import gsap from "gsap";

import { committeeMember } from "./Committees";

interface MeetTheTeamCloudMobileTabletProps {
    committeeMembers: committeeMember[];
    panelStyles: Record<"panel" | "header" | "content", string>;
}

const MeetTheTeamCloudMobileTablet = ({ committeeMembers, panelStyles }: MeetTheTeamCloudMobileTabletProps) => {
    // panelContentRef is used to get width of panelContent container; this width is used in committee member "rotating" animation
    const panelContentRef = useRef<HTMLDivElement | null>(null);
    const [panelContentWidth, setPanelContentWidth] = useState(0);

    // set new panelContent width whenever screen size changes
    // this is to make sure that animation never ends early or way too late
    useEffect(() => {
        const el = panelContentRef.current;
        if (!el) return;

        const onResize = () => setPanelContentWidth(el.offsetWidth);
        onResize();

        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // animation logic: handles revolving committeeMember icons
    const committeeMemberIconsRef = useRef<HTMLDivElement | null>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    useEffect(() => {
        const el = committeeMemberIconsRef.current;

        // kill timeline if committeeMemberIcons reference or panelContentWidth state has not been set
        if (!el || panelContentWidth <= 0) {
            tlRef.current?.kill();
            tlRef.current = null;
            return;
        }

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });
        tlRef.current = tl;
        tl.set(el, { x: panelContentWidth });
        tl.to(el, { x: -el.scrollWidth, duration: 10, ease: "linear" });

        return () => {
            tl.kill();
            if (tlRef.current === tl) tlRef.current = null;
        };
    }, [panelContentWidth]);

    const [selectedMemberIdx, setSelectedMemberIdx] = useState<number | null>(null);
    const handleClick = (hoveredIdx: number) => {
        if (selectedMemberIdx === null) {
            tlRef.current?.pause();
            setSelectedMemberIdx(hoveredIdx);
        } else {
            tlRef.current?.resume();
            setSelectedMemberIdx(null);
        }
    }

    return (
        <div className="relative block lg:hidden mx-auto w-[90%] md:w-3/4">
            <Image src={FlyingCarMobileTablet} alt="" className="w-full h-full" />

            {/* Safe Content Area */}
            <Panel id={"meetTheTeamPanelMobileTablet"} className={cn(panelStyles["panel"], "translate-y-[40%] md:translate-y-[41%] -translate-x-1/2 w-[78%] md:w-[70%] h-[65%] md:h-[65%]")}>
                <PanelHeader
                    parentPanelId={"meetTheTeamPanelMobileTablet"}
                    as={"h2"}
                    className={panelStyles["header"]}
                >
                    MEET THE TEAM
                </PanelHeader>
                <PanelContent
                    parentPanelId={"meetTheTeamPanelMobileTablet"}
                    className={cn(panelStyles["content"], "flex flex-col pt-2 md:pt-2")}
                >
                    {/* this div is only used to be a reference to retrieve the panelContent's width */}
                    <div
                        className="relative w-full h-[30%] shrink-0"
                        ref={panelContentRef}
                    >
                        <div
                            ref={committeeMemberIconsRef}
                            className="h-full flex gap-x-[5vmin] px-5"
                        >
                            {committeeMembers.map((committeeMember, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className={`relative h-full mx-auto aspect-square border-black border rounded-full cursor-pointer hover:scale-110 duration-300 ${selectedMemberIdx === idx && "scale-110"}`}
                                        onClick={() => handleClick(idx)}
                                    >
                                        <Image
                                            src={committeeMember.image_path}
                                            alt=""
                                            fill
                                            sizes="(min-width: 768px) 14vmin, 18vmin"
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        <div className="absolute top-0 left-0 w-[10%] h-full bg-[linear-gradient(90deg,rgba(244,253,255,1)_0%,rgba(244,253,255,1)_50%,rgba(244,253,255,0)_100%)]" />
                        <div className="absolute top-0 right-0 w-[10%] h-full bg-[linear-gradient(260deg,rgba(244,253,255,1)_0%,rgba(244,253,255,1)_50%,rgba(244,253,255,0)_100%)]" />
                    </div>

                    <div className="grow h-full grid place-content-center text-shadow-md lg:text-lg xl:text-xl text-center">
                        {selectedMemberIdx !== null ?
                            <>
                                <Link
                                    href={committeeMembers[selectedMemberIdx]["link"]}
                                    target="_"
                                    className="lg:text-xl xl:text-2xl font-semibold underline underline-offset-2 text-blue-400"
                                >
                                    {committeeMembers[selectedMemberIdx]["name"]}
                                </Link>
                                <p>
                                    {
                                        committeeMembers[selectedMemberIdx]["roles"].map((role, jdx) =>
                                            <span key={jdx}>
                                                {role}{(jdx !== committeeMembers[selectedMemberIdx]["roles"].length - 1) && ", "}
                                            </span>)
                                    }
                                </p>
                            </> :
                            <p>
                                Hover over one of our wonderful hackathon organizers to learn more about them!
                            </p>
                        }
                    </div>
                </PanelContent>
            </Panel>
        </div>
    );
}

export default MeetTheTeamCloudMobileTablet;