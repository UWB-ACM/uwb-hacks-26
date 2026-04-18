import { MeetTheTeamCloudProps } from "./Committees";
import CommitteeMemberInfo from "./CommitteeMemberInfo";
import CommitteeMemberIcon from "./CommitteeMemberIcon";

const MeetTheTeamCloudDesktop = ({
    committeeMembers,
    panelContentRef,
    committeeMemberIconsRef,
    handleClick,
    selectedMemberIdx,
}: MeetTheTeamCloudProps) => {
    return (
        <>
            <div
                className="relative w-[40%] h-full shrink-0 overflow-hidden"
                ref={panelContentRef}
            >
                <div
                    ref={committeeMemberIconsRef}
                    className="flex flex-col will-change-transform"
                >
                    {/* rendered twice for the purpose of the infinite carousel animation */}
                    {[0, 1].map((dup) => (
                        <div
                            key={dup}
                            className="flex flex-col gap-y-[5vmin] pt-[5vmin] shrink-0"
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
                <div className="absolute top-0 w-full h-[20%] bg-[linear-gradient(180deg,rgba(244,253,255,1)_0%,rgba(244,253,255,1)_50%,rgba(244,253,255,0)_100%)]" />
                <div className="absolute bottom-0 w-full h-[20%] bg-[linear-gradient(0deg,rgba(244,253,255,1)_0%,rgba(244,253,255,1)_50%,rgba(244,253,255,0)_100%)]" />
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

export default MeetTheTeamCloudDesktop;
