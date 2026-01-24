import Image from "next/image"

import ConnectCloud from "@/public/clouds/ConnectCloud.svg";
import StrongBrandPresenceCloud from "@/public/clouds/StrongBrandPresenceCloud.svg";
import LongTermRelationshipCloud from "@/public/clouds/LongTermRelationshipCloud.svg";

import Hover from "./Hover";

export default function WhySponsorClouds() {
    const cloudDimensions = "w-3/4 md:w-3/5 lg:w-1/2 xl:w-2/5"

    return (
        <div className="opacity-90 space-y-[13vh] lg:space-y-[15vh] xl:space-y-[18vh] pb-[13vh] md:pb-[15vh] lg:pb-[20vh] xl:pb-[20vh]">
            <div className="w-full flex">
                <div className="w-[5%] md:w-[10%]" />
                <Hover duration={8} className={cloudDimensions}>
                    <Image src={ConnectCloud} alt="" className="z-8 w-full" />
                </Hover>
                <div className="flex-1" />
            </div>
            <div className="w-full flex">
                <div className="flex-1" />
                <Hover duration={15} className={cloudDimensions}>
                    <Image src={StrongBrandPresenceCloud} alt="" className="z-8 w-full" />
                </Hover>
                <div className="w-[5%] md:w-[10%]" />
            </div>
            <div className="w-full flex">
                <div className="w-[10%] md:w-[20%]" />
                <Hover duration={12} className={cloudDimensions}>
                    <Image src={LongTermRelationshipCloud} alt="" className="z-8 w-full" />
                </Hover>
                <div className="flex-1" />
            </div>
        </div>
    );
}