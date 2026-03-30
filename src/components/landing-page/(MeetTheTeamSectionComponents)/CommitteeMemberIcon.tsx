import Image from "next/image";
import { committeeMember } from "./Committees";

interface CommitteeMemberIconProps {
    idx: number;
    committeeMember: committeeMember;
    isSelected: boolean;
    handleClick: (selectedIdx: number) => void;
}

const CommitteeMemberIcon = ({
    idx,
    committeeMember,
    isSelected,
    handleClick
}: CommitteeMemberIconProps) => {
    return (
        <div
            className={`relative w-3/5 mx-auto aspect-square border-black border rounded-full cursor-pointer hover:scale-110 duration-300 ${isSelected && "scale-110"}`}
            onClick={() => handleClick(idx)}
        >
            <Image
                src={committeeMember.image_path}
                alt=""
                fill
                sizes="(min-width: 1200px) 12vw, (min-width: 1000px) 17vw"
            />
        </div>);
}

export default CommitteeMemberIcon;