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
        "name": "Breanna Powell",
        "roles": ["Marketing Lead", "Local Arrangements Member", "Production Management Member", "Sponsorships Outreach Member"],
        "image_path": "/MeetTheTeamPhotos/breanna-powell.jpg",
        "link": "https://www.linkedin.com/in/breanna-powell-wa/",
    },
    {
        "name": "Chin Chadalavada",
        "roles": ["Sponsorships Outreach Lead"],
        "image_path": "/MeetTheTeamPhotos/chinmayee-chadalavada.jpg",
        "link": "https://www.linkedin.com/in/chinmayee-chadalavada-4279a4243/",
    },
    {
        "name": "Hannah Kim",
        "roles": ["Production Management Lead"],
        "image_path": "/MeetTheTeamPhotos/hannah-kim.jpg",
        "link": "https://www.linkedin.com/in/hannah-hanul/",
    },
    {
        "name": "Sai Bathina",
        "roles": ["BCA", "Avanade Rep", "Content and Design Co-lead"],
        "image_path": "/MeetTheTeamPhotos/sai-bathina.jpg",
        "link": "https://www.linkedin.com/in/saikanishkbathina/",
    },
    {
        "name": "Simon Dao",
        "roles": ["Website Development Lead"],
        "image_path": "/MeetTheTeamPhotos/simon-dao.jpg",
        "link": "https://www.linkedin.com/in/simon-dao/",
    },
    {
        "name": "Vinaya Chava",
        "roles": ["Local Arrangements Lead"],
        "image_path": "/MeetTheTeamPhotos/vinaya-chava.jpg",
        "link": "https://www.linkedin.com/in/vinayachava/",
    }
]

const MeetTheTeamSection = () => {
    const panelStyles = "flex flex-col absolute top-0 left-1/2 border-0 translate-y-[40%] md:translate-y-[41%] lg:translate-y-[70%] xl:translate-y-[65%] -translate-x-1/2 w-[78%] md:w-[70%] lg:w-[85%] xl:w-[85%] h-[65%] md:h-[65%] lg:h-[51.5%] xl:h-[54%]";
    const panelHeaderStyles = "border-0 lg:border-0 w-full lg:w-full font-glacial-indifference font-semibold text-[#2b3244] p-3 bg-transparent";
    const panelContentStyles = "relative grow flex p-0 md:p-0 overflow-hidden"

    const panelContentRef = useRef<HTMLDivElement | null>(null);
    const [selectedMemberIdx, setSelectedMemberIdx] = useState<number | null>(null);
    const committeeMemberIconsRef = useRef<HTMLDivElement | null>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const selectedMemberIdxRef = useRef<number | null>(null);
    selectedMemberIdxRef.current = selectedMemberIdx;

    // isMobile state logic
    // sets isMobile to true when viewport width is < 1000, otherwise false
    // used to conditionally render correct version of MeetTheTeamSection
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width < 1000);
            selectedMemberIdxRef.current = null;
            setSelectedMemberIdx(null);
            tlRef.current?.resume();
        };
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const el = committeeMemberIconsRef.current;
        if (!el) {
            tlRef.current?.kill();
            tlRef.current = null;
            return;
        }

        const buildTimeline = () => {
            tlRef.current?.kill();
            const half = isMobile ? el.scrollWidth / 2 : el.scrollHeight / 2;
            if (half <= 0) {
                tlRef.current = null;
                return;
            }

            const tl = gsap.timeline({ repeat: -1 });
            tlRef.current = tl;

            if (isMobile) {
                gsap.set(el, { x: 0 });
                tl.fromTo(el, { x: 0 }, { x: -half, duration: 10, ease: "none" });
            } else {
                gsap.set(el, { y: -half });
                tl.fromTo(el, { y: -half }, { y: 0, duration: 10, ease: "none" });
            }

            if (selectedMemberIdxRef.current !== null) {
                tl.pause();
            }
        };

        buildTimeline();
        const ro = new ResizeObserver(() => buildTimeline());
        ro.observe(el);

        return () => {
            ro.disconnect();
            tlRef.current?.kill();
            tlRef.current = null;
        };
    }, [isMobile]);

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
