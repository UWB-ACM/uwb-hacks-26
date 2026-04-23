import "server-only";

const botToken = process.env.DISCORD_BOT_TOKEN!;

async function sendDM(userId: string, message: string) {
    const dmRes = await fetch(
        "https://discord.com/api/v10/users/@me/channels", // create a DM channel for the bot
        {
            method: "POST",
            headers: {
                Authorization: `Bot ${botToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                recipient_id: userId, // recipient of the DM channel
            }),
        },
    );

    const dm = await dmRes.json(); // stores DM channel ID (used to send a message) and type
    console.log("DM channel info: " + dm.id + " " + dm.type);

    // sends a message through the DM channel
    await fetch(`https://discord.com/api/v10/channels/${dm.id}/messages`, {
        method: "POST",
        headers: {
            Authorization: `Bot ${botToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content: message, // the message we send
        }),
    });
}

// send DMs to a list of users (broadcast)
export async function broadcastDM(userIds: string[], message: string) {
    for (const id of userIds) {
        try {
            await sendDM(id, message);

            // basic rate limit safety
            await new Promise((r) => setTimeout(r, 1100));
        } catch (err) {
            console.error(`Failed to DM ${id}`, err);
        }
    }
}
