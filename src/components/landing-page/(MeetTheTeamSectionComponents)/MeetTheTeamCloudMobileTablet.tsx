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
    selectedMemberIdx,
}: MeetTheTeamCloudMobileTabletProps) => {
    return (
        <>
            <div
                className="relative w-full h-[42%] md:h-[45%] py-1 shrink-0 overflow-hidden"
                ref={panelContentRef}
            >
                <div
                    ref={committeeMemberIconsRef}
                    className="flex h-full w-max will-change-transform"
                >
                    {/* rendered twice for the purpose of the infinite carousel animation */}
                    {[0, 1].map((dup) => (
                        <div
                            key={dup}
                            className="flex h-full shrink-0 gap-x-[5vmin] pl-[5vmin]"
                        >
                            {committeeMembers.map((committeeMember, idx) => (
                                <CommitteeMemberIcon
                                    key={`${dup}-${idx}`}
                                    idx={idx}
                                    committeeMember={committeeMember}
                                    isSelected={idx === selectedMemberIdx}
                                    handleClick={handleClick}
                                />
                            ))}
                        </div>
                    ))}
                </div>

                {/* white linear gradients to make memberIcons fade in / fade out */}
                <div className="absolute top-0 left-0 w-[10%] h-full bg-[linear-gradient(90deg,rgba(244,253,255,1)_0%,rgba(244,253,255,1)_50%,rgba(244,253,255,0)_100%)]" />
                <div className="absolute top-0 right-0 w-[10%] h-full bg-[linear-gradient(260deg,rgba(244,253,255,1)_0%,rgba(244,253,255,1)_50%,rgba(244,253,255,0)_100%)]" />
            </div>

            <CommitteeMemberInfo
                committeeMember={
                    selectedMemberIdx !== null
                        ? committeeMembers[selectedMemberIdx]
                        : null
                }
            />
        </>
    );
};

export default MeetTheTeamCloudMobileTablet;
