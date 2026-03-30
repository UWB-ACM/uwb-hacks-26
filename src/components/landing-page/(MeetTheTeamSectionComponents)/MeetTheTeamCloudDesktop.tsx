import { RefObject } from "react";
import { committeeMember } from "./Committees";
import CommitteeMemberInfo from "./CommitteeMemberInfo";
import CommitteeMemberIcon from "./CommitteeMemberIcon";

interface MeetTheTeamCloudDesktopProps {
    committeeMembers: committeeMember[];
    panelContentRef: RefObject<HTMLDivElement | null>;
    committeeMemberIconsRef: RefObject<HTMLDivElement | null>;
    handleClick: (selectedIdx: number) => void;
    selectedMemberIdx: number | null;
}

const MeetTheTeamCloudDesktop = ({
    committeeMembers,
    panelContentRef,
    committeeMemberIconsRef,
    handleClick,
    selectedMemberIdx
}: MeetTheTeamCloudDesktopProps) => {
    return (
        <>
            <div
                className="relative w-[40%] h-full shrink-0"
                ref={panelContentRef}
            >
                <div
                    ref={committeeMemberIconsRef}
                    className="flex flex-col gap-y-[5vmin] py-10"
                >
                    {committeeMembers.map((committeeMember, idx) =>
                        <CommitteeMemberIcon
                            key={idx}
                            idx={idx}
                            committeeMember={committeeMember}
                            isSelected={idx === selectedMemberIdx}
                            handleClick={handleClick}
                        />
                    )}
                </div>

                <div className="absolute top-0 w-full h-[20%] bg-[linear-gradient(180deg,rgba(244,253,255,1)_0%,rgba(244,253,255,1)_50%,rgba(244,253,255,0)_100%)]" />
                <div className="absolute bottom-0 w-full h-[20%] bg-[linear-gradient(0deg,rgba(244,253,255,1)_0%,rgba(244,253,255,1)_50%,rgba(244,253,255,0)_100%)]" />
            </div>

            <CommitteeMemberInfo
                committeeMember={
                    selectedMemberIdx !== null ?
                        committeeMembers[selectedMemberIdx] :
                        null
                }
            />
        </>
    );
}

export default MeetTheTeamCloudDesktop;