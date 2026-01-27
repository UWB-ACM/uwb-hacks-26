import Image, { StaticImageData } from "next/image";
import { cn } from "@/src/util/utils";

interface SponsorshipTierProps {
    image: StaticImageData;
    onClick: () => void;
    className?: string;
}

export default function SponsorshipTier({
    image,
    onClick,
    className = "",
}: SponsorshipTierProps) {
    return (
        <button
            onClick={onClick}
            className="w-1/5 flex justify-center items-center"
        >
            <Image
                src={image}
                alt=""
                className={cn("w-3/5 lg:w-2/5 h-auto duration-300", className)}
            />
        </button>
    );
}
