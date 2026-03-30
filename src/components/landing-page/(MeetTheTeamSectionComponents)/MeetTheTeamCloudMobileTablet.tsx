import { RefObject } from "react";
import { committeeMember } from "./Committees";
import CommitteeMemberInfo from "./CommitteeMemberInfo";
import CommitteeMemberIcon from "./CommitteeMemberIcon";

interface MeetTheTeamCloudMobileTabletProps {
    committeeMembers: committeeMember[];
    panelContentRef: RefObject<HTMLDivElement | null>;
    committeeMemberIconsRef: RefObject<HTMLDivElement | null>;
    handleClick: (selectedIdx: number) => void;
    selectedMemberIdx: number | null;
}

const MeetTheTeamCloudMobileTablet = ({
    committeeMembers,
    panelContentRef,
    committeeMemberIconsRef,
    handleClick,
    selectedMemberIdx
}: MeetTheTeamCloudMobileTabletProps) => {
    return (
        <>
            <div
                className="relative w-full h-[42%] md:h-[45%] pt-2 shrink-0"
                ref={panelContentRef}
            >
                <div
                    ref={committeeMemberIconsRef}
                    className="h-full flex gap-x-[5vmin] px-5"
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

                <div className="absolute top-0 left-0 w-[10%] h-full bg-[linear-gradient(90deg,rgba(244,253,255,1)_0%,rgba(244,253,255,1)_50%,rgba(244,253,255,0)_100%)]" />
                <div className="absolute top-0 right-0 w-[10%] h-full bg-[linear-gradient(260deg,rgba(244,253,255,1)_0%,rgba(244,253,255,1)_50%,rgba(244,253,255,0)_100%)]" />
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

export default MeetTheTeamCloudMobileTablet;