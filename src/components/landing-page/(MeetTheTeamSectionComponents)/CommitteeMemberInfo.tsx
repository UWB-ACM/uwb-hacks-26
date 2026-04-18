import Link from "next/link";
import { CommitteeMember } from "./Committees";
import { cn } from "@/src/util/utils";

interface CommitteeMemberInfoProps {
    committeeMember: CommitteeMember | null;
    isHidden: boolean;
}

const CommitteeMemberInfo = ({
    committeeMember,
    isHidden,
}: CommitteeMemberInfoProps) => {
    const roles =
        committeeMember !== null ? committeeMember.roles.join(", ") : null;

    return (
        <div
            className={cn(
                "flex h-full min-h-0 grow flex-col overflow-y-auto overflow-x-hidden text-shadow-md text-center lg:text-left",
                isHidden ? "hidden" : "flex",
            )}
        >
            {committeeMember ? (
                <div className="m-auto w-full max-w-full p-3">
                    <Link
                        href={committeeMember.link}
                        target="_blank"
                        className="text-lg lg:text-xl font-semibold underline lg:no-underline lg:hover:underline underline-offset-2 text-blue-400"
                    >
                        {committeeMember.name}
                    </Link>
                    <p className="text-base md:text-lg">{roles}</p>
                </div>
            ) : (
                <p className="m-auto p-3 text-base md:text-lg lg:text-center">
                    Select one of our wonderful hackathon organizers to learn
                    more about them!
                </p>
            )}
        </div>
    );
};

export default CommitteeMemberInfo;
