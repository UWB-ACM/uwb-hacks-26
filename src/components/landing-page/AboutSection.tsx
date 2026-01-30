import Image from "next/image";

import CloudSlideIn from "./(AboutSectionComponents)/CloudSlideIn";
import ParticipantsCloud from "@/public/about/ParticipantsCloud.svg";
import SubmittedProjectsCloud from "@/public/about/SubmittedProjectsCloud.svg";
import MOHEventsCloud from "@/public/about/MOHEventsCloud.svg";
import WeekendEventsCloud from "@/public/about/WeekendEventsCloud.svg";

import FlyingCarWithBanner from "@/src/components/landing-page/(AboutSectionComponents)/FlyingCarWithBanner";

import CitySkyline from "@/public/about/skyline.png";
import Grass from "@/public/Grass.png";

export default function AboutSection() {
    return (
        <div className="bg-[linear-gradient(180deg,#1382DC_0%,#16C2F7_50%,#C3EFFE_100%)]">
            <div className="mt-[10vmin] md:mt-[14vmin] space-y-[4vmin] md:space-y-[8vmin] lg:space-y-[10vmin]">
                <CloudSlideIn
                    cloudImage={ParticipantsCloud}
                    alt={"300+ Hackers"}
                    position={"left"}
                    padding={"12%"}
                />
                <CloudSlideIn
                    cloudImage={SubmittedProjectsCloud}
                    alt={"88 Submitted Projects"}
                    position={"right"}
                    padding={"15%"}
                />
                <CloudSlideIn
                    cloudImage={MOHEventsCloud}
                    alt={"11 Month of Hacking Events"}
                    position={"left"}
                    padding={"15%"}
                />
                <CloudSlideIn
                    cloudImage={WeekendEventsCloud}
                    alt={"14 Hackathon Weekend Events"}
                    position={"right"}
                    padding={"12%"}
                />
            </div>

            <FlyingCarWithBanner />

            {/* City Skyline and Grass */}
            <div className="w-full relative">
                <Image
                    src={CitySkyline}
                    alt=""
                    className="w-full -translate-y-3 md:-translate-y-5 lg:-translate-y-10"
                    sizes="100vw"
                />
                <Image
                    src={Grass}
                    alt=""
                    className="w-full h-1/2 absolute bottom-0"
                    sizes="100vw"
                />
            </div>
        </div>
    );
};