import "server-only";

const guildId = process.env.DISCORD_GUILD_ID!;
const botToken = process.env.DISCORD_BOT_TOKEN!;

export async function getGuildMembers() {
    console.log("in getguildmembers");
    let after = "0";
    let allMembers: any[] = [];

    while (true) {
        console.log("in getguildmembers LOOP");
        const res = await fetch(
            `https://discord.com/api/v10/guilds/${guildId}/members?limit=1000&after=${after}&with_user=true`,
            {
                headers: {
                    Authorization: `Bot ${botToken}`,
                },
            },
        );
        console.log("after fetch");

        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Discord API error: ${res.status} - ${text}`);
        }

        const batch = await res.json();
        console.log("results" + batch);

        if (!Array.isArray(batch) || batch.length === 0) break;

        allMembers.push(...batch);

        after = batch[batch.length - 1].user.id;

        // safety break (prevents infinite loops)
        if (batch.length < 1000) break;
    }

    return allMembers;
}
