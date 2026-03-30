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
        <div className="grow h-full grid place-content-center text-shadow-md lg:text-lg xl:text-xl text-center lg:text-left">
            {committeeMember ?
                <>
                    <Link
                        href={committeeMember["link"]}
                        target="_"
                        className="lg:text-xl xl:text-2xl font-semibold underline lg:no-underline lg:hover:underline underline-offset-2 text-blue-400"
                    >
                        {committeeMember["name"]}
                    </Link>
                    <p>{roles}</p>
                </> :
                <p className="text-base md:text-lg lg:text-center">
                    Select one of our wonderful hackathon organizers to learn more about them!
                </p>
            }
        </div>
    );
}

export default CommitteeMemberInfo;