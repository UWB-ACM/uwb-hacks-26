import "server-only";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { Project } from "./dataTypes";

const FROM_EMAIL = "noreply@uwbhacks.com";
const EMAIL_SRC = `UWB Hacks <${FROM_EMAIL}>`;

const TEST_MODE = true;
const TEST_EMAIL = "testEmail@gmail.com";
const SEND_DELAY_MS = 100;

const ses = new SESClient({
    region: process.env.AWS_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type EmailBody = {
    Text: { Data: string };
    Html?: { Data: string };
};

type SendEmailParams = {
    to: string;
    subject: string;
    body: EmailBody;
};

// Sends one email through AWS SES
async function sendEmail({
    to,
    subject,
    body,
}: SendEmailParams): Promise<void> {
    const destinationEmail = TEST_MODE ? TEST_EMAIL : to;

    const command = new SendEmailCommand({
        Source: EMAIL_SRC,
        Destination: {
            ToAddresses: [destinationEmail],
        },
        Message: {
            Subject: {
                Data: subject,
            },
            Body: body,
        },
    });

    await ses.send(command);
}

// Sends multiple emails with same subject/body
export async function sendEmails(
    emails: string[],
    subject: string,
    message: EmailBody,
) {
    const successfulEmails: string[] = [];
    const failedEmails: { email: string; error: unknown }[] = [];

    const targets = TEST_MODE ? emails.slice(0, 1) : emails;

    for (const email of targets) {
        try {
            await sendEmail({
                to: email,
                subject,
                body: message,
            });

            if (TEST_MODE) {
                failedEmails.push({
                    email,
                    error: "TEST MODE: sent to test inbox instead",
                });
            } else {
                successfulEmails.push(email);
            }
        } catch (error) {
            console.error("SES send failed:", email, error);
            failedEmails.push({ email, error });
        }

        await delay(SEND_DELAY_MS);
    }

    return { successfulEmails, failedEmails };
}

// Sends Devpost linking emails
export async function sendDevpostLinkingEmails(
    targets: { devpost_email: string; code: string }[],
) {
    const successfulEmails: string[] = [];
    const failedEmails: { email: string; error: unknown }[] = [];

    const baseUrl = "https://uwbhacks.com";
    const recipients = TEST_MODE ? targets.slice(0, 1) : targets;

    for (const target of recipients) {
        const link = `${baseUrl}/link-devpost?code=${target.code}`;

        const subject =
            "Action Required: Link your Devpost Account | UWB Hacks 26";

        const textBody = `
Please link your Devpost account (${target.devpost_email}) here:

${link}

To ensure your team receives judging alerts, please link your accounts.
        `.trim();

        const htmlBody = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; padding: 24px;">
    <h1>UWB Hacks 2026</h1>

    <p>
        We noticed you registered on Devpost using:
        <strong>${target.devpost_email}</strong>
    </p>

    <p>
        Your Devpost account has not been linked to your UWB Hacks portal yet.
    </p>

    <p>
        <a href="${link}">
            Link Accounts Now
        </a>
    </p>

    <p>
        If the button doesn't work:
        <br />
        ${link}
    </p>
</body>
</html>
        `.trim();

        try {
            await sendEmail({
                to: target.devpost_email,
                subject,
                body: {
                    Text: { Data: textBody },
                    Html: { Data: htmlBody },
                },
            });

            if (TEST_MODE) {
                failedEmails.push({
                    email: target.devpost_email,
                    error: "TEST MODE: sent to test inbox instead",
                });
            } else {
                successfulEmails.push(target.devpost_email);
            }
        } catch (error) {
            console.error("SES send failed:", target.devpost_email, error);

            failedEmails.push({
                email: target.devpost_email,
                error,
            });
        }

        await delay(SEND_DELAY_MS);
    }

    return { successfulEmails, failedEmails };
}

export async function sendTableAssignmentEmails(projects: Project[]) {
    const successfulEmails: string[] = [];
    const failedEmails: { email: string; error: unknown }[] = [];

    const subject = "[URGENT] UWB Hacks 2026 Presentation Location";

    const recipientProjects = TEST_MODE ? projects.slice(0, 1) : projects;

    for (const p of recipientProjects) {
        const destinationEmails = TEST_MODE ? [TEST_EMAIL] : p.userEmails;
        const textBody = `${p.room} at table ${p.tableNum}`;
        const htmlBody = `<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0; background-color: #f4f8fe; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f8fe; padding: 40px 20px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">

          <!-- Header -->
          <tr>
            <td align="center" style="background-color: #0a84dc; padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 1px;">UWB HACKS 2026</h1>
               <p style="color: #84c6ff; font-size: 16px; margin: 8px 0 0 0; font-weight: 500; text-transform: uppercase; letter-spacing: 2px;">The Future</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">

              <h2 style="margin:0 0 10px; font-size:18px; color:#111;">
                Your <strong>Official</strong> Presentation Details are Ready
              </h2>

              <p style="font-size:16px; color:#444; line-height:1.6;">
                Hello Hacker!
              </p>

              <!-- Main message box -->
              <div style="margin:20px 0; padding:16px; background:#f0f7ff; border-left:4px solid #0a84dc;">
                <p style="margin:0; font-size:16px; color:#1d4ed8; line-height:1.5;">
                    Your project will present in the following location:
                    <br>
                    ${textBody}
                </p>
              </div>

              <p style="font-size:16px; color:#555; line-height:1.6;">
                Please arrive at your assigned table at least 10 minutes early.
              </p>

              <p style="font-size:16px; color:#555; line-height:1.6;">
                If you have any issues finding your location, please a UWB Hacks staff member.
              </p>
            </td>
          </tr>
        </table>
                 <!-- Outer Footer -->
            <p style="color: #a0aec0; font-size: 12px; text-align: center; margin-top: 20px;">
                &copy; 2026 UWB Hacks. All rights reserved.
            </p>
      </td>
    </tr>
  </table>
</body>
</html>`;

        for (const email of destinationEmails) {
            const command = new SendEmailCommand({
                Source: EMAIL_SRC,
                Destination: {
                    ToAddresses: [email],
                },
                Message: {
                    Subject: {
                        Data: subject,
                    },
                    Body: {
                        Text: {
                            Data: textBody,
                        },
                        Html: {
                            Data: htmlBody,
                        },
                    },
                },
            });

            try {
                await ses.send(command);

                if (TEST_MODE) {
                    failedEmails.push({
                        email,
                        error: "TEST_MODE: sent to test email instead",
                    });
                } else {
                    successfulEmails.push(email);
                }
            } catch (error) {
                console.error("SES send failed:", email, error);
                failedEmails.push({ email, error });
            }

            await delay(100);
        }
    }

    return { successfulEmails, failedEmails };
}
