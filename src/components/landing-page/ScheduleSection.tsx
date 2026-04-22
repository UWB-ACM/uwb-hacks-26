import React from "react";

import Image from "next/image";
import ScheduleCloudTop from "@/public/scheduleSection/ScheduleCloudTop.svg";
import ScheduleCloudBody from "@/public/scheduleSection/ScheduleCloudBody.svg";
import ScheduleCloudBottom from "@/public/scheduleSection/ScheduleCloudBottom.svg";

import Panel from "./(AboutSectionComponents)/Panel/Panel";
import PanelHeader from "./(AboutSectionComponents)/Panel/Header";
import PanelContent from "./(AboutSectionComponents)/Panel/Content";

const ScheduleSection: React.FC = () => {
    return (
        <div className="mx-auto w-[90%] max-w-[850px]">
            <Image
                src={ScheduleCloudTop}
                alt=""
                className="relative z-5 w-full"
            />
            <div className="relative z-0 w-full -translate-y-0.5 px-[15%]">
                <Image
                    src={ScheduleCloudBody}
                    alt=""
                    fill
                    className="absolute top-0 object-fill"
                />

                <div className="relative z-5 w-full h-[600px]">bleh</div>
            </div>
            <Image
                src={ScheduleCloudBottom}
                alt=""
                className="relative z-5 w-full -translate-y-0.5"
            />
        </div>
    );
};

interface ScheduleCardProps {
    day: string;
    date: string;
    spirit: string;
    events: {
        time: string;
        name: string;
        description: string;
        location: string;
    }[];
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({
    day,
    date,
    spirit,
    events,
}) => {
    return (
        <div className="relative border-2 border-black bg-white p-4 md:p-5 flex flex-col min-h-[350px] md:min-h-[450px] overflow-hidden schedule-card transition-transform">
            <div className="flex justify-between items-start mb-2 relative">
                <h2 className="text-xl md:text-3xl font-light text-black">
                    {day}
                </h2>

                <div className="flex flex-col items-end -mt-2">
                    <span className="text-base md:text-lg font-bold text-yellow-500">
                        {date.split(" ")[0]}
                    </span>
                    <span className="text-lg md:text-xl font-bold text-yellow-500 uppercase">
                        {date.split(" ")[1]}
                    </span>
                </div>
            </div>

            <div className="border-t border-black mb-4"></div>

            {events.length > 0 ? (
                <div className="grow space-y-2 mb-2">
                    <p className="text-base md:text-2xl font-edge-of-the-galaxy text-yellow-500 text-center my-2">
                        {spirit}
                    </p>

                    {events.map((event, index) => (
                        <div
                            key={index}
                            className="border-gray-300 hover:scale-[102%] transition cursor-pointer hover:border-yellow-500 hover:bg-[#fdf4c5] bg-white border "
                        >
                            <div className="flex w-full">
                                <div className="justify-items-center w-full bg-orange-400 flex shadow-sm p-2 px-4">
                                    <span className="grow text-xs text-white font-bold w-[45%] pr-2 shrink-0">
                                        {event.time}
                                    </span>
                                    <span className="text-xs self-end font-bold text-white ">
                                        {event.name}
                                    </span>
                                </div>
                            </div>
                            <div className="px-2 pt-2 font-bold text-sm text-gray-500">
                                Location: {event.location}
                            </div>
                            <div className="p-2 text-sm text-gray-500">
                                {event.description}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-400 italic">No events scheduled</p>
            )}
        </div>
    );
};

export default ScheduleSection;
