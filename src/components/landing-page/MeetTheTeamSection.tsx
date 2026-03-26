// import React, { useState } from "react";
// import { committees } from "@/src/components/landing-page/(MeetTheTeamSectionComponents)/Committees";
// import CommitteeTabs from "@/src/components/landing-page/(MeetTheTeamSectionComponents)/CommitteeTabs";
// import MembersGrid from "@/src/components/landing-page/(MeetTheTeamSectionComponents)/MembersGrid";
import Panel from "./(AboutSectionComponents)/Panel/Panel";
import PanelHeader from "./(AboutSectionComponents)/Panel/Header";
import PanelContent from "./(AboutSectionComponents)/Panel/Content";

import Image from "next/image";
import FlyingCarDesktop from "@/public/clouds/FlyingCarCloud_Desktop.png";
import FlyingCarMobileTablet from "@/public/clouds/FlyingCarCloud_MobileTablet.png"

import { cn } from "@/src/util/utils";

const MeetTheTeamSection = () => {
    const panelStyles = "flex flex-col absolute top-0 left-1/2 border-0";
    const panelHeaderStyles = "border-0 lg:border-0 w-full lg:w-full font-glacial-indifference font-semibold text-[#2b3244] p-3 bg-transparent";
    const panelContentStlyes = "p-0 md:p-0 grow";

    return (
        <div className="my-[12vmin]">
            <div className="relative hidden lg:block mx-auto lg:w-3/4 xl:w-3/5">
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
                    <PanelContent parentPanelId={"meetTheTeamPanelDesktop"} className={panelContentStlyes}>
                        bleh
                    </PanelContent>
                </Panel>
            </div>

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
                    <PanelContent parentPanelId={"meetTheTeamPanelMobileTablet"} className={panelContentStlyes}>
                        bleh
                    </PanelContent>
                </Panel>
            </div>
        </div >
    );
};

export default MeetTheTeamSection;
