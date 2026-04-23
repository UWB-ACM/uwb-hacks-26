import HomePage from "@/src/app/HomePage";
import { getPrizes } from "../util/db/prize";
import { getLeaderboard } from "../util/db/leaderboard";
import { getSession } from "../util/session";
import { hasPermissions, PermissionLevel } from "../util/dataTypes";
import { getPermissionLevel } from "../util/db/user";

export default async function Page() {
    // The catch is to let this work in builds without databases.
    const hackeroonPrizes = getPrizes().catch((e) => {
        console.error(e);
        return [];
    });
    const leaderboardData = getLeaderboard().catch((e) => {
        console.error(e);
        return [];
    });
    const session = await getSession().catch(() => null);
    const permission = session?.user?.id
        ? await getPermissionLevel(session.user.id).catch(() => null)
        : null;
    const isJudge =
        permission != null &&
        hasPermissions(permission, { has: PermissionLevel.Judge });

    return (
        <HomePage
            hackeroonPrizes={hackeroonPrizes}
            leaderboardData={leaderboardData}
            isJudge={isJudge}
        />
    );
}
