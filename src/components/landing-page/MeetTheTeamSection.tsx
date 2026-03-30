import { useState, useEffect, useRef } from "react";

import MeetTheTeamCloudDesktop from "./(MeetTheTeamSectionComponents)/MeetTheTeamCloudDesktop";
import MeetTheTeamCloudMobileTablet from "./(MeetTheTeamSectionComponents)/MeetTheTeamCloudMobileTablet";
import gsap from "gsap";

import Image from "next/image";
import FlyingCarDesktop from "@/public/clouds/FlyingCarCloud_Desktop.png";
import FlyingCarMobileTablet from "@/public/clouds/FlyingCarCloud_MobileTablet.png"

import Panel from "./(AboutSectionComponents)/Panel/Panel";
import PanelHeader from "./(AboutSectionComponents)/Panel/Header";
import PanelContent from "./(AboutSectionComponents)/Panel/Content";

import { cn } from "@/src/util/utils";

// TODO: fill out actual committeeMember info
// this is temporary, will replace with committees list in (MeetTheTeamSection)/Committees.tsx and import list in mobile/tablet and desktop MeetTheTeam components rather than passing in as props
const committeeMembers = [
    {
        "name": "test_name1",
        "image_path": "/HALL-E.png",
        "roles": ["role1", "role2"],
        "link": "https://www.google.com"
    },
    {
        "name": "test_name2",
        "image_path": "/HALL-E.png",
        "roles": ["role1"],
        "link": "https://www.google.com"
    },
    {
        "name": "test_name3",
        "image_path": "/HALL-E.png",
        "roles": ["role1", "role2", "role3"],
        "link": "https://www.google.com"
    },
    {
        "name": "test_name4",
        "image_path": "/HALL-E.png",
        "roles": ["role1", "role2"],
        "link": "https://www.google.com"
    }
]

const MeetTheTeamSection = () => {
    const panelStyles = "flex flex-col absolute top-0 left-1/2 border-0 translate-y-[40%] md:translate-y-[41%] lg:translate-y-[70%] xl:translate-y-[65%] -translate-x-1/2 w-[78%] md:w-[70%] lg:w-[85%] xl:w-[85%] h-[65%] md:h-[65%] lg:h-[51.5%] xl:h-[54%]";
    const panelHeaderStyles = "border-0 lg:border-0 w-full lg:w-full font-glacial-indifference font-semibold text-[#2b3244] p-3 bg-transparent";
    const panelContentStyles = "relative grow flex p-0 md:p-0 overflow-hidden"

    // isMobile state logic
    // sets isMobile to true when viewport width is < 1000, otherwise false
    // used to conditionally render correct version of MeetTheTeamSection
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 1000);
        };
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // logic for setting animation offset
    // set to panelContent width for mobile and tablet screens
    // set to panelContent height for desktop screens
    const panelContentRef = useRef<HTMLDivElement | null>(null);
    const [animationOffset, setAnimationOffset] = useState(0);
    useEffect(() => {
        const el = panelContentRef.current;
        if (!el) return;

        if (isMobile) {
            setAnimationOffset(el.offsetWidth);
        } else {
            setAnimationOffset(el.offsetHeight);
        }
    }, [isMobile]);

    // initialize gsap animation timeline and set animation depending on whether user is on mobile/tablet or desktop
    const committeeMemberIconsRef = useRef<HTMLDivElement | null>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    useEffect(() => {
        const el = committeeMemberIconsRef.current;

        // kill timeline if committeeMemberIcons ref or animationOffset state has not been set
        if (!el || animationOffset <= 0) {
            tlRef.current?.kill();
            tlRef.current = null;
            return;
        }

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 });
        tlRef.current = tl;

        // on mobile / tablet, animation will go from right to left
        // on desktop, animation will go from top to bottom
        if (isMobile) {
            tl.set(el, { x: animationOffset });
            tl.to(el, { x: -el.scrollWidth, duration: 10, ease: "linear" });
        } else {
            tl.set(el, { y: "-100%" });
            tl.to(el, { y: animationOffset, duration: 10, ease: "linear" });
        }

        return () => {
            tl.kill();
            if (tlRef.current === tl) tlRef.current = null;
        };
    }, [animationOffset]);

    // track currently selected committeeMember index
    // pause animation completely when any committeeMember is selected
    const [selectedMemberIdx, setSelectedMemberIdx] = useState<number | null>(null);
    const handleClick = (selectedIdx: number) => {
        if (selectedMemberIdx === null || selectedIdx !== selectedMemberIdx) {
            tlRef.current?.pause();
            setSelectedMemberIdx(selectedIdx);
        } else {
            tlRef.current?.resume();
            setSelectedMemberIdx(null);
        }
    }

    return (
        <div className="my-[12vmin] relative mx-auto w-[90%] md:w-[75%] lg:w-[80%] xl:w-[60%]">
            {isMobile ?
                <Image src={FlyingCarMobileTablet} alt="" className="w-full h-full" /> :
                <Image src={FlyingCarDesktop} alt="" className="w-full h-full" />
            }

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
                    className={cn(panelContentStyles, isMobile && "flex-col pt-2 md:pt-2")}
                >
                    {!isMobile ?
                        <MeetTheTeamCloudDesktop
                            committeeMembers={committeeMembers}
                            panelContentRef={panelContentRef}
                            committeeMemberIconsRef={committeeMemberIconsRef}
                            handleClick={handleClick}
                            selectedMemberIdx={selectedMemberIdx}
                        /> :
                        <MeetTheTeamCloudMobileTablet
                            committeeMembers={committeeMembers}
                            panelContentRef={panelContentRef}
                            committeeMemberIconsRef={committeeMemberIconsRef}
                            handleClick={handleClick}
                            selectedMemberIdx={selectedMemberIdx}
                        />
                    }
                </PanelContent>
            </Panel>
        </div >
    );
};

export default MeetTheTeamSection;
