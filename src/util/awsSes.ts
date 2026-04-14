import "server-only";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({
    region: process.env.AWS_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

/**
 * Sends Devpost linking emails to a list of targets.
 * @param targets - is the list of targets to send emails to.
 * Each target should have a devpost_email and a code for linking.
 * 
 * @returns an object containing lists of successful and failed email sends.
 */
export async function sendDevpostLinkingEmails(
    targets: { devpost_email: string; code: string }[],
) {
    const successfulEmails: string[] = [];
    const failedEmails: { email: string; error: any }[] = [];

    const baseUrl = "uwbhacks.com";
    const fromEmail = process.env.SES_FROM_EMAIL as string;
    const promises = [];

    for (const target of targets) {
        const link = `${baseUrl}/dashboard/link-devpost?code=${target.code}`;

        const command = new SendEmailCommand({
            Source: fromEmail,
            Destination: { ToAddresses: [target.devpost_email] },
            Message: {
                Subject: { Data: "Action Required: Link your Devpost Account" },
                Body: {
                    Text: {
                        Data: `Please link your Devpost account to your UWB Hacks 2026 profile here: ${link}`,
                    },
                    Html: {
                        Data: `<p>Please link your Devpost account to your UWB Hacks 2026 profile here: <a href="${link}">${link}</a></p>`,
                    },
                },
            },
        });

        try {
            await ses.send(command);
            successfulEmails.push(target.devpost_email);
        } catch (error) {
            failedEmails.push({ email: target.devpost_email, error });
        }
    }

    return { successfulEmails, failedEmails };
}
