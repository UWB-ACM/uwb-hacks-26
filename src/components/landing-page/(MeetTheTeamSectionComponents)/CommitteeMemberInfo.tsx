import Link from "next/link";
import { committeeMember } from "./Committees";

interface CommitteeMemberInfoProps {
    committeeMember: committeeMember | null;
}

const CommitteeMemberInfo = ({ committeeMember }: CommitteeMemberInfoProps) => {
    const roles = (committeeMember !== null) ?
        committeeMember["roles"].map((role, jdx) =>
            <span key={jdx}>
                {role}{(jdx !== committeeMember["roles"].length - 1) && ", "}
            </span>
        ) :
        null;

    return (
        <div className="flex h-full min-h-0 grow flex-col overflow-y-auto overflow-x-hidden text-shadow-md text-center lg:text-left">
            {committeeMember ?
                <div className="m-auto w-full max-w-full p-3">
                    <Link
                        href={committeeMember["link"]}
                        target="_"
                        className="text-lg lg:text-xl font-semibold underline lg:no-underline lg:hover:underline underline-offset-2 text-blue-400"
                    >
                        {committeeMember["name"]}
                    </Link>
                    <p className="text-base md:text-lg">{roles}</p>
                </div> :
                <p className="m-auto p-3 text-base md:text-lg lg:text-center">
                    Select one of our wonderful hackathon organizers to learn more about them!
                </p>
            }
        </div>
    );
}

export default CommitteeMemberInfo;