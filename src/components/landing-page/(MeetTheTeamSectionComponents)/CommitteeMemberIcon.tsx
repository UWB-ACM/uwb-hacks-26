import Image from "next/image";
import { CommitteeMember } from "./Committees";

interface CommitteeMemberIconProps {
    idx: number;
    committeeMember: CommitteeMember;
    isSelected: boolean;
    handleClick: (selectedIdx: number) => void;
    tabIndex: 0 | -1;
}

const CommitteeMemberIcon = ({
    idx,
    committeeMember,
    isSelected,
    handleClick,
    tabIndex,
}: CommitteeMemberIconProps) => {
    return (
        <button
            type="button"
            className={`relative mx-0 h-full w-auto max-h-full md:w-3/5 md:mx-auto aspect-square border-black border rounded-full overflow-hidden cursor-pointer hover:scale-104 duration-300 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${isSelected ? "scale-104" : "scale-100"}`}
            onClick={() => handleClick(idx)}
            tabIndex={tabIndex}
            aria-pressed={isSelected}
            aria-label={committeeMember.name}
        >
            <Image
                src={committeeMember.image_path}
                alt={committeeMember.name}
                fill
                sizes="(min-width: 1200px) 12vw, (min-width: 1000px) 17vw"
            />
        </button>
    );
};

export default CommitteeMemberIcon;
