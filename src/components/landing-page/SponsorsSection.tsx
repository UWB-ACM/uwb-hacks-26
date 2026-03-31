import Image from "next/image";
import Grass from "@/public/Grass.png";
import CityBackground2 from "@/public/City-Background-2.png";
import CitySkylineLightBlue from "@/public/sponsorsSection/City-Skyline-LightBlue.png";
import Billboard from "@/public/sponsorsSection/Billboard.png";
import { motion } from "motion/react";

const SponsorsSection = () => {
    return (
        <>
            <div className="relative py-10">
                <div className="z-5 relative h-auto w-[60vw] md:w-[50vw] lg:w-[48vw] xl:w-[45vw] mx-auto mb-0 md:mb-8 lg:mb-16 xl:mb-32">
                    <Image src={Billboard} alt="" className="w-full h-full" />

                    <div className="absolute left-[0.5vw] top-[2.1vw] md:top-[1.68vw] aspect-1765/1059 w-[59vw] md:w-[49vw] lg:w-[47vw] xl:w-[44vw] h-auto overflow-hidden">
                        <motion.h2
                            initial={{ y: 0 }}
                            whileInView={{ y: "100%" }}
                            viewport={{ amount: 0.75, once: true }}
                            transition={{
                                delay: 0.75,
                                duration: 0.75,
                                ease: "easeOut",
                            }}
                            className="w-full h-full grid place-content-center text-2xl md:text-4xl lg:text-5xl font-bold bg-[#f6fcff]"
                        >
                            SPONSORS
                        </motion.h2>
                    </div>
                </div>

                <Image
                    src={CitySkylineLightBlue}
                    alt=""
                    className="z-0 absolute bottom-0 w-screen -translate-y-[25px]"
                />

                <div className="z-5 absolute bottom-0 w-screen flex -translate-y-[10px] md:-translate-y-[25px]">
                    <Image src={CityBackground2} alt="" className="w-1/3" />
                    <Image src={CityBackground2} alt="" className="w-1/3" />
                    <Image src={CityBackground2} alt="" className="w-1/3" />
                </div>
                <Image
                    src={Grass}
                    alt=""
                    className="z-5 absolute bottom-0 w-screen"
                />
            </div>

            <Image
                src={Grass}
                alt=""
                className="z-5 w-screen -scale-y-100 -translate-y-1 opacity-60"
            />
        </>
    );
};

export default SponsorsSection;
