import { cn } from "@/src/util/utils";
import { MeetTheTeamCloudProps } from "./Committees";
import CommitteeMemberInfo from "./CommitteeMemberInfo";
import CommitteeMemberIcon from "./CommitteeMemberIcon";

const MeetTheTeamCloud = ({
    committeeMembers,
    panelContentRef,
    committeeMemberIconsRef,
    handleClick,
    selectedMemberIdx,
    isMobile,
}: MeetTheTeamCloudProps & { isMobile: boolean }) => {
    return (
        <>
            <div
                className={cn(
                    "relative shrink-0 overflow-hidden",
                    isMobile
                        ? "w-full h-[42%] md:h-[45%] py-1"
                        : "w-[40%] h-full",
                )}
                ref={panelContentRef}
            >
                <div
                    ref={committeeMemberIconsRef}
                    className={cn(
                        "will-change-transform",
                        isMobile ? "flex h-full w-max" : "flex flex-col",
                    )}
                >
                    {/* rendered twice for the purpose of the infinite carousel animation */}
                    {[0, 1].map((dup) => (
                        <div
                            key={dup}
                            className={cn(
                                "shrink-0",
                                isMobile
                                    ? "flex h-full gap-x-[5vmin] pl-[5vmin]"
                                    : "flex flex-col gap-y-[5vmin] pt-[5vmin]",
                            )}
                        >
                            {committeeMembers.map((committeeMember, idx) => (
                                <CommitteeMemberIcon
                                    key={`${dup}-${idx}`}
                                    idx={idx}
                                    committeeMember={committeeMember}
                                    isSelected={idx === selectedMemberIdx}
                                    handleClick={handleClick}
                                    tabIndex={dup === 0 ? 0 : -1}
                                />
                            ))}
                        </div>
                    ))}
                </div>

                {/* white linear gradients to make memberIcons fade in / fade out */}
                {isMobile ? (
                    <>
                        <div className="absolute top-0 left-0 w-[10%] h-full bg-[linear-gradient(90deg,rgba(244,253,255,1)_0%,rgba(244,253,255,1)_50%,rgba(244,253,255,0)_100%)]" />
                        <div className="absolute top-0 right-0 w-[10%] h-full bg-[linear-gradient(260deg,rgba(244,253,255,1)_0%,rgba(244,253,255,1)_50%,rgba(244,253,255,0)_100%)]" />
                    </>
                ) : (
                    <>
                        <div className="absolute top-0 w-full h-[20%] bg-[linear-gradient(180deg,rgba(244,253,255,1)_0%,rgba(244,253,255,1)_50%,rgba(244,253,255,0)_100%)]" />
                        <div className="absolute bottom-0 w-full h-[20%] bg-[linear-gradient(0deg,rgba(244,253,255,1)_0%,rgba(244,253,255,1)_50%,rgba(244,253,255,0)_100%)]" />
                    </>
                )}
            </div>

            <CommitteeMemberInfo
                committeeMember={null}
                isHidden={selectedMemberIdx !== null}
            />

            {committeeMembers.map((committeeMember, idx) => (
                <CommitteeMemberInfo
                    key={idx}
                    committeeMember={committeeMember}
                    isHidden={selectedMemberIdx !== idx}
                />
            ))}
        </>
    );
};

export default MeetTheTeamCloud;
