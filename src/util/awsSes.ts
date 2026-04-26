import "server-only";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { Html } from "next/document";

const ses = new SESClient({
    region: process.env.AWS_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * sends the users of a project the room and table number they will present at
 * @param targets - is the list of targets to send emails to.
 * Each target should have a devpost_email and a message to output.
 */
export async function sendTableAssignmentEmails(
    emails: string[],
    message: string,
) {
    const successfulEmails: string[] = [];
    const failedEmails: { email: string; error: unknown }[] = [];

    const fromEmail = "noreply@uwbhacks.com";

    // TEMPORARY OVERRIDE FOR TESTING: If TEST_MODE is true, we will only send one email to a test address to avoid spamming real users while testing. Remember to set this back to false in production!
    const TEST_MODE = false;

    // TEST OVERRIDE: Limit to 1 email maximum during testing so you don't get spammed
    if (TEST_MODE) {
        emails = emails.slice(0, 1);
    }

    const htmlBody = `
<!DOCTYPE html>
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
                Your Presentation Details Are Ready 🎤
              </h2>

              <p style="font-size:16px; color:#444; line-height:1.6;">
                Hello hacker!
              </p>

              <!-- Main message box -->
              <div style="margin:20px 0; padding:16px; background:#f0f7ff; border-left:4px solid #0a84dc;">
                <p style="margin:0; font-size:16px; color:#1d4ed8; line-height:1.5;">
                  ${message}
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
</html>
`;

    for (const email of emails) {
        const destinationEmail = TEST_MODE ? "testerEmail@gmail.com" : email;

        const command = new SendEmailCommand({
            Source: `UWB Hacks <${fromEmail}>`,
            Destination: { ToAddresses: [destinationEmail] },
            Message: {
                Subject: {
                    Data: "[URGENT] Presentation Location Assignment | UWB Hacks 26",
                },
                Body: {
                    Text: {
                        Data: message,
                    },
                    Html: {
                        Data: htmlBody,
                    },
                },
            },
        });

        // send email
        try {
            await ses.send(command);
            if (TEST_MODE) {
                // temporary manual failure for test mode so we don't accidentally update the DB
                failedEmails.push({
                    email: email,
                    error: "TEST MODE: sent to test email instead of real target",
                });
            } else {
                successfulEmails.push(email);
            }
        } catch (error) {
            console.error("Detailed SES Send Error for", email, error);
            failedEmails.push({ email: email, error });
        }

        // Add a short delay between sends to avoid hitting SES rate limits
        await delay(100);
    }

    return { successfulEmails, failedEmails };
}

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
    const failedEmails: { email: string; error: unknown }[] = [];

    const baseUrl = "https://uwbhacks.com";
    const fromEmail = "noreply@uwbhacks.com";

    // TEMPORARY OVERRIDE FOR TESTING: If TEST_MODE is true, we will only send one email to a test address to avoid spamming real users while testing. Remember to set this back to false in production!
    const TEST_MODE = true;

    // TEST OVERRIDE: Limit to 1 email maximum during testing so you don't get spammed
    if (TEST_MODE) {
        targets = targets.slice(0, 1);
    }

    for (const target of targets) {
        const link = `${baseUrl}/link-devpost?code=${target.code}`;

        const destinationEmail = TEST_MODE
            ? "testerEmail@example.com"
            : target.devpost_email;

        const htmlBody = `
            <!DOCTYPE html>
            <html>
            <body style="margin: 0; padding: 0; background-color: #f4f8fe; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f8fe; padding: 40px 20px;">
                    <tr>
                        <td align="center">
                            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                                <!-- Header -->
                                <tr>
                                    <td align="center" style="background-color: #0a84dc; padding: 40px 20px; text-align: center;">
                                        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 1px;">UWB HACKS 2026</h1>
                                        <p style="color: #84c6ff; font-size: 16px; margin: 8px 0 0 0; font-weight: 500; text-transform: uppercase; letter-spacing: 2px;">The Future</p>
                                    </td>
                                </tr>
                                
                                <!-- Content -->
                                <tr>
                                    <td style="padding: 40px 30px;">
                                        <h2 style="color: #1a1a1a; margin-top: 0; font-size: 20px; font-weight: 700;">Action Required: Link Your Account</h2>
                                        
                                        <p style="color: #4a5568; line-height: 1.6; font-size: 16px; margin-bottom: 24px;">
                                            We noticed you successfully registered on Devpost using the email <strong style="color: #0a84dc;">${target.devpost_email}</strong>. 
                                        </p>
                                        
                                        <div style="background-color: #e6f3ff; border-left: 4px solid #0a84dc; padding: 16px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
                                            <p style="color: #2b6cb0; line-height: 1.5; margin: 0; font-size: 15px;">
                                                <strong>Important:</strong> Your Devpost account hasn't been linked to your UWB Hacks portal yet. To ensure your team receives alerts surrounding judging for your project, please link your accounts.
                                            </p>
                                        </div>

                                        <!-- Button -->
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="center">
                                                    <a href="${link}" style="display: inline-block; background-color: #0a84dc; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: bold; font-size: 16px; transition: background-color 0.2s;">
                                                        Link Accounts Now
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Footer -->
                                <tr>
                                    <td style="background-color: #f8fafc; padding: 24px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                                        <p style="color: #718096; font-size: 13px; line-height: 1.5; margin: 0 0 12px 0;">
                                            If the button doesn't work, copy and paste this link into your browser:<br/>
                                            <a href="${link}" style="color: #0a84dc; text-decoration: none; word-break: break-all;">${link}</a>
                                        </p>
                                        ${TEST_MODE ? `<p style="color: #e53e3e; font-size: 12px; font-weight: bold; margin: 0;">[TEST OVERRIDE ACTIVE: Original Target was ${target.devpost_email}]</p>` : ""}
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
            </html>
        `;

        const command = new SendEmailCommand({
            Source: `UWB Hacks <${fromEmail}>`,
            Destination: { ToAddresses: [destinationEmail] },
            Message: {
                Subject: {
                    Data: "Action Required: Link your Devpost Account | UWB Hacks 26",
                },
                Body: {
                    Text: {
                        Data: `Please link your Devpost account (${target.devpost_email}) to your UWB Hacks 2026 profile here: ${link}\n\nTo ensure your team receives alerts surrounding judging for your project, please link your accounts.`,
                    },
                    Html: {
                        Data: htmlBody,
                    },
                },
            },
        });

        // actually send email
        try {
            await ses.send(command);
            if (TEST_MODE) {
                // temporary manual failure for test mode so we don't accidentally update the DB
                failedEmails.push({
                    email: target.devpost_email,
                    error: "TEST MODE: sent to test email instead of real target",
                });
            } else {
                successfulEmails.push(target.devpost_email);
            }
        } catch (error) {
            console.error(
                "Detailed SES Send Error for",
                target.devpost_email,
                error,
            );
            failedEmails.push({ email: target.devpost_email, error });
        }

        // Add a short delay between sends to avoid hitting SES rate limits
        await delay(100);
    }

    return { successfulEmails, failedEmails };
}
