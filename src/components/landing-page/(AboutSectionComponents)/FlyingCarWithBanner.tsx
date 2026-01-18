import Image from "next/image";
import FlyingCar from "@/public/about/FlyingCar.png";
import Banner from "@/public/about/Banner.svg";

export default function FlyingCarWithBanner() {
    return (
        <div className="flex items-center justify-center my-[10vmin] md:my-[14vmin]">
            {/* Banner with text */}
            <Image
                src={Banner}
                alt="The future is closer than you think. Stay tuned for more..."
                className="w-[40%]"
            />

            {/* Flying Car */}
            <Image
                src={FlyingCar}
                alt=""
                className="w-1/4 -ml-2 md:-ml-4 lg:-ml-6"
                priority
                sizes="25vw"
            />
        </div>
    );
}
