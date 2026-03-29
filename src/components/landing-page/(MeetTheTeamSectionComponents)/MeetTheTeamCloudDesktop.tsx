import { useState, useRef, useEffect } from "react";

import Panel from "../(AboutSectionComponents)/Panel/Panel";
import PanelHeader from "../(AboutSectionComponents)/Panel/Header";
import PanelContent from "../(AboutSectionComponents)/Panel/Content";

import Image from "next/image";
import FlyingCarDesktop from "@/public/clouds/FlyingCarCloud_Desktop.png";

import { cn } from "@/src/util/utils";

import gsap from "gsap";
import Link from "next/link";

interface committeeMember {
    name: string;
    image_path: string;
    roles: string[];
    link: string;
}

interface MeetTheTeamCloudDesktopProps {
    committeeMembers: committeeMember[];
}

const MeetTheTeamCloudDesktop = ({ committeeMembers }: MeetTheTeamCloudDesktopProps) => {
    const panelStyles = "flex flex-col absolute top-0 left-1/2 border-0";
    const panelHeaderStyles = "border-0 lg:border-0 w-full lg:w-full font-glacial-indifference font-semibold text-[#2b3244] p-3 bg-transparent";
    const panelContentStyles = "p-0 md:p-0 grow relative overflow-hidden";

    // panelContentRef is used to get height of panelContent container; this height is used in committee member "rotating" animation
    const panelContentRef = useRef<HTMLDivElement | null>(null);
    const [panelContentHeight, setPanelContentHeight] = useState(0);

    // set new panelContent height whenever screen size changes
    // this is to make sure that animation never ends early or way too late
    useEffect(() => {
        const el = panelContentRef.current;
        if (!el) return;

        const onResize = () => setPanelContentHeight(el.offsetHeight);
        onResize();

        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // animation logic: handles revolving committeeMember icons
    const committeeMemberIconsRef = useRef<HTMLDivElement | null>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    useEffect(() => {
        const el = committeeMemberIconsRef.current;

        // kill timeline if committeeMemberIcons reference or panelContentHeight state has not been set
        if (!el || panelContentHeight <= 0) {
            tlRef.current?.kill();
            tlRef.current = null;
            return;
        }

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });
        tlRef.current = tl;
        tl.set(el, { y: "-100%" });
        tl.to(el, { y: panelContentHeight, duration: 10, ease: "linear" });

        return () => {
            tl.kill();
            if (tlRef.current === tl) tlRef.current = null;
        };
    }, [panelContentHeight]);

    const [selectedMemberIdx, setSelectedMemberIdx] = useState<number | null>(null);
    const onMouseEnter = (hoveredIdx: number) => {
        tlRef.current?.pause();
        setSelectedMemberIdx(hoveredIdx);
    }
    const onMouseLeave = () => {
        tlRef.current?.resume();
        setSelectedMemberIdx(null);
    }

    return (
        <div className="relative hidden lg:block mx-auto lg:w-4/5 xl:w-3/5">
            <Image src={FlyingCarDesktop} alt="" className="w-full h-full" />

            {/* Safe Content Area */}
            <Panel id={"meetTheTeamPanelDesktop"} className={cn(panelStyles, "lg:translate-y-[70%] xl:translate-y-[65%] -translate-x-1/2 lg:w-[85%] xl:w-[85%] lg:h-[51.5%] xl:h-[54%]")}>
                <PanelHeader
                    parentPanelId={"meetTheTeamPanelDesktop"}
                    as={"h2"}
                    className={panelHeaderStyles}
                >
                    MEET THE TEAM
                </PanelHeader>
                <PanelContent
                    parentPanelId={"meetTheTeamPanelDesktop"}
                    className={panelContentStyles + " flex"}
                >
                    {/* this div is only used to be a reference to retrieve the panelContent's height */}
                    <div
                        className="relative w-[40%] h-full shrink-0"
                        ref={panelContentRef}
                    >
                        <div
                            ref={committeeMemberIconsRef}
                            className="flex flex-col gap-y-[5vmin] py-10"
                        >
                            {committeeMembers.map((committeeMember, idx) => {
                                return (
                                    <Link
                                        key={idx}
                                        href={committeeMember["link"]}
                                        className="relative w-3/5 mx-auto aspect-square border-black border rounded-full cursor-pointer hover:scale-110 duration-300"
                                        onMouseEnter={() => onMouseEnter(idx)}
                                        onMouseLeave={() => onMouseLeave()}
                                    >
                                        <Image
                                            src={committeeMember.image_path}
                                            alt=""
                                            fill
                                            sizes="(min-width: 1200px) 12vw, (min-width: 1000px) 17vw"
                                        />
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="absolute top-0 w-full h-[20%] bg-[linear-gradient(180deg,rgba(244,253,255,1)_0%,rgba(244,253,255,1)_50%,rgba(244,253,255,0)_100%)]" />
                        <div className="absolute bottom-0 w-full h-[20%] bg-[linear-gradient(0deg,rgba(244,253,255,1)_0%,rgba(244,253,255,1)_50%,rgba(244,253,255,0)_100%)]" />
                    </div>

                    <div className="grow h-full grid place-content-center text-shadow-md lg:text-lg xl:text-xl">
                        {selectedMemberIdx !== null ?
                            <>
                                <p className="lg:text-xl xl:text-2xl font-semibold">{committeeMembers[selectedMemberIdx]["name"]}</p>
                                <p>
                                    {
                                        committeeMembers[selectedMemberIdx]["roles"].map((role, jdx) =>
                                            <span key={jdx}>
                                                {role}{(jdx !== committeeMembers[selectedMemberIdx]["roles"].length - 1) && ", "}
                                            </span>)
                                    }
                                </p>
                            </> :
                            <p className="text-center">
                                Hover over one of our wonderful hackathon organizers to learn more about them!
                            </p>
                        }
                    </div>
                </PanelContent>
            </Panel>
        </div>
    );
}

export default MeetTheTeamCloudDesktop;