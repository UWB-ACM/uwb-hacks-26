import Link from "next/link";
import { X } from "lucide-react";
import { CommitteeMember } from "./Committees";
import { cn } from "@/src/util/utils";

interface CommitteeMemberInfoProps {
    committeeMember: CommitteeMember | null;
    isHidden: boolean;
    onClose?: () => void;
}

const CommitteeMemberInfo = ({
    committeeMember,
    isHidden,
    onClose,
}: CommitteeMemberInfoProps) => {
    const roles =
        committeeMember !== null ? committeeMember.roles.join(", ") : null;

    return (
        <div
            className={cn(
                "relative flex h-full min-h-0 grow flex-col overflow-y-auto overflow-x-hidden text-shadow-md text-center lg:text-left",
                isHidden ? "hidden" : "flex",
            )}
        >
            {committeeMember ? (
                <>
                    {onClose && (
                        <button
                            type="button"
                            onClick={onClose}
                            aria-label="Close committeeMemberInfo"
                            className="absolute top-2 right-2 rounded-full p-1 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black cursor-pointer"
                        >
                            <X size={22} />
                        </button>
                    )}
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
                </>
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
