import Image from "next/image";

import ParticipantsCloud from "@/public/about/ParticipantsCloud.svg";
import SubmittedProjectsCloud from "@/public/about/SubmittedProjectsCloud.svg";
import MOHEventsCloud from "@/public/about/MOHEventsCloud.svg";
import WeekendEventsCloud from "@/public/about/WeekendEventsCloud.svg";

import FlyingCarWithBanner from "@/src/components/landing-page/(AboutSectionComponents)/FlyingCarWithBanner";

import CitySkyline from "@/public/about/skyline.png";
import Grass from "@/public/about/Grass.png";

const AboutSection = () => {
    const cloudDimensions = "w-[73%] md:w-[60%] lg:w-[55%] xl:w-[50%]";
    const topCloudGroupTransform = "-translate-x-[18%] md:-translate-x-[20%]";
    const bottomCloudGroupTransform = "translate-x-[18%] md:translate-x-[20%]";

    return (
        <div className="bg-[linear-gradient(180deg,#1382DC_0%,#16C2F7_50%,#C3EFFE_100%)]">
            <div className="grid grid-cols-2 place-items-center gap-[7vmin] lg:gap-y-[10vmin] mt-[10vmin] mx-5 md:mx-10">
                <Image
                    src={ParticipantsCloud}
                    alt="623 Participants"
                    className={`${cloudDimensions} ${topCloudGroupTransform}`}
                />
                <Image
                    src={SubmittedProjectsCloud}
                    alt="88 Submitted Projects"
                    className={`${cloudDimensions} ${topCloudGroupTransform}`}
                />
                <Image
                    src={MOHEventsCloud}
                    alt="11 Month of Hacking Events"
                    className={`${cloudDimensions} ${bottomCloudGroupTransform}`}
                />
                <Image
                    src={WeekendEventsCloud}
                    alt="14 Hackathon Wekeend Events"
                    className={`${cloudDimensions} ${bottomCloudGroupTransform}`}
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

export default AboutSection;
