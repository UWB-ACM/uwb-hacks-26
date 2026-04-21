import { useEffect, useState } from "react";
import { MeetTheTeamCloudProps, committeeMembers } from "./Committees";
import CommitteeMemberInfo from "./CommitteeMemberInfo";
import CommitteeMemberIcon from "./CommitteeMemberIcon";

const MeetTheTeamCloud = ({
    panelContentRef,
    committeeMemberIconsRef,
    handleClick,
    handleDeselect,
    selectedMemberIdx,
}: MeetTheTeamCloudProps) => {
    const [isReversed, setIsReversed] = useState(false);

    useEffect(() => {
        const el = committeeMemberIconsRef.current;
        if (!el) return;

        const checkDirection = () => {
            const isRow = window.getComputedStyle(el).flexDirection === "row";
            setIsReversed(!isRow);
        };

        checkDirection();

        const ro = new ResizeObserver(checkDirection);
        ro.observe(el);

        return () => ro.disconnect();
    }, [committeeMemberIconsRef]);

    const displayMembers = isReversed
        ? [...committeeMembers].reverse()
        : committeeMembers;

    return (
        <>
            <div
                className="relative shrink-0 overflow-hidden w-full h-[42%] md:h-[45%] py-1 lg:w-[40%] lg:h-full lg:py-0"
                ref={panelContentRef}
            >
                <div
                    ref={committeeMemberIconsRef}
                    className="will-change-transform flex h-full w-max lg:flex-col lg:h-auto lg:w-auto"
                >
                    {/* rendered twice for the purpose of the infinite carousel animation */}
                    {[0, 1].map((dup) => (
                        <div
                            key={dup}
                            className="shrink-0 flex h-full gap-x-[5vmin] pl-[5vmin] lg:flex-col lg:h-auto lg:gap-x-0 lg:gap-y-[5vmin] lg:pl-0 lg:pt-[5vmin]"
                        >
                            {displayMembers.map((committeeMember, idx) => (
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
                <div className="block lg:hidden absolute top-0 left-0 w-[10%] h-full bg-[linear-gradient(90deg,rgba(244,253,255,1)_0%,rgba(244,253,255,1)_50%,rgba(244,253,255,0)_100%)]" />
                <div className="block lg:hidden absolute top-0 right-0 w-[10%] h-full bg-[linear-gradient(260deg,rgba(244,253,255,1)_0%,rgba(244,253,255,1)_50%,rgba(244,253,255,0)_100%)]" />
                <div className="hidden lg:block absolute top-0 w-full h-[20%] bg-[linear-gradient(180deg,rgba(244,253,255,1)_0%,rgba(244,253,255,1)_50%,rgba(244,253,255,0)_100%)]" />
                <div className="hidden lg:block absolute bottom-0 w-full h-[20%] bg-[linear-gradient(0deg,rgba(244,253,255,1)_0%,rgba(244,253,255,1)_50%,rgba(244,253,255,0)_100%)]" />
            </div>

            <CommitteeMemberInfo
                committeeMember={null}
                isHidden={selectedMemberIdx !== null}
            />

            {displayMembers.map((committeeMember, idx) => (
                <CommitteeMemberInfo
                    key={idx}
                    committeeMember={committeeMember}
                    isHidden={selectedMemberIdx !== idx}
                    onClose={handleDeselect}
                />
            ))}
        </>
    );
};

export default MeetTheTeamCloud;
