import { useState, useRef, useEffect } from "react";

import Panel from "../(AboutSectionComponents)/Panel/Panel";
import PanelHeader from "../(AboutSectionComponents)/Panel/Header";
import PanelContent from "../(AboutSectionComponents)/Panel/Content";

import Image from "next/image";
import FlyingCarMobileTablet from "@/public/clouds/FlyingCarCloud_MobileTablet.png"

import { cn } from "@/src/util/utils";

interface committeeMember {
    name: string;
    image_path: string;
    roles: string[];
    link: string;
}

interface MeetTheTeamCloudMobileTabletProps {
    committeeMembers: committeeMember[];
}

const MeetTheTeamCloudMobileTablet = ({ committeeMembers }: MeetTheTeamCloudMobileTabletProps) => {
    const panelStyles = "flex flex-col absolute top-0 left-1/2 border-0";
    const panelHeaderStyles = "border-0 lg:border-0 w-full lg:w-full font-glacial-indifference font-semibold text-[#2b3244] p-3 bg-transparent";
    const panelContentStyles = "p-0 md:p-0 grow relative overflow-hidden";

    return (
        <div className="relative block lg:hidden mx-auto w-[90%] md:w-3/4">
            <Image src={FlyingCarMobileTablet} alt="" className="w-full h-full" />

            {/* Safe Content Area */}
            <Panel id={"meetTheTeamPanelMobileTablet"} className={cn(panelStyles, "translate-y-[40%] md:translate-y-[41%] -translate-x-1/2 w-[78%] md:w-[70%] h-[65%] md:h-[65%]")}>
                <PanelHeader
                    parentPanelId={"meetTheTeamPanelMobileTablet"}
                    as={"h2"}
                    className={panelHeaderStyles}
                >
                    MEET THE TEAM
                </PanelHeader>
                <PanelContent parentPanelId={"meetTheTeamPanelMobileTablet"} className={panelContentStyles}>
                    bleh
                </PanelContent>
            </Panel>
        </div>
    );
}

export default MeetTheTeamCloudMobileTablet;