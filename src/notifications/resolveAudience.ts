import { getAllUsers } from "../util/db/user";
import { ApplicationData } from "../util/dataTypes";
import { getApplication } from "@/src/util/db/application";

export async function resolveAudience(
    audience: any,
): Promise<ApplicationData[]> {
    const allUsers = await getAllUsers();
    const allApplications = (
        await Promise.all(allUsers.map((user) => getApplication(user.id)))
    ).filter((app): app is ApplicationData => app !== null);

    const app2 = await getApplication(2);
    const list: ApplicationData[] = app2 ? [app2] : [];

    switch (audience.type) {
        case "all_users":
            console.log("All applications: " + list[0].discordUsername);
            // return allApplications;
            return list;
    }
    return [];
}
