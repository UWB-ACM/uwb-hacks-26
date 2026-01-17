import {
    ApplicationData,
    ClassStanding,
    Major,
    ReferralSource,
} from "./dataTypes";

/*
 * Maximum allowed length for responses in the sign-up form
 * Should be used on the frontend for Form UI constraints and on the backend for validation
 */
export const APPLICATION_LIMITS = {
    name: 100,
    email: 200,
    phone: 20,
    discordUsername: 50,
    school: 200,
    teamMembers: 300,
    goals: 2000,
    hackathonExperience: 2000,
    portfolioLink: 500,
} as const;

/*
 * Valid enum values that match database option constraints
 */
const VALID_JUDGING_PREFERENCES: ApplicationData["judgingPreference"][] = [
    "PRESENTATION STYLE",
    "CONFERENCE STYLE",
    "NO PREFERENCE",
] as const;

/*
 * Valid no-code preferences that match database option constraints
 */
const VALID_NO_CODE_PREFERENCES: ApplicationData["noCodePreference"][] = [
    "CODE",
    "NO CODE",
    "NO PREFERENCE",
] as const;

/**
 * Validates application data to ensure all required fields are present and within length limits.
 * @param data - The application data to validate.
 * @returns A string describing the errors found, or null if no errors are present.
 */
export function validateApplicationData(data: ApplicationData): string | null {
    const errorsFound: string[] = [];

    const checkLength = (
        field: string,
        value: string | null,
        limit: number,
        required: boolean = false,
    ) => {
        if (!value?.trim()) {
            if (required) errorsFound.push(`${field} is required`);
            return;
        }
        if (value.length > limit) {
            errorsFound.push(`${field} must be at most ${limit} characters`);
        }
    };

    // Validate string length limits
    checkLength("Name", data.name, APPLICATION_LIMITS.name, true);
    checkLength("Email", data.email, APPLICATION_LIMITS.email, true);
    checkLength("Phone", data.phone, APPLICATION_LIMITS.phone, false);
    checkLength(
        "Discord Username",
        data.discordUsername,
        APPLICATION_LIMITS.discordUsername,
        true,
    );
    checkLength("School", data.school, APPLICATION_LIMITS.school, true);
    checkLength(
        "Team Members",
        data.teamMembers,
        APPLICATION_LIMITS.teamMembers,
        false,
    );
    checkLength("Goals", data.goals, APPLICATION_LIMITS.goals, true);
    checkLength(
        "Hackathon Experience",
        data.hackathonExperience,
        APPLICATION_LIMITS.hackathonExperience,
        true,
    );
    checkLength(
        "Portfolio Link",
        data.portfolioLink,
        APPLICATION_LIMITS.portfolioLink,
        false,
    );

    // Validate enum fields to ensure they match allowed values
    if (!VALID_JUDGING_PREFERENCES.includes(data.judgingPreference)) {
        errorsFound.push(
            `Judging Preference must be one of: ${VALID_JUDGING_PREFERENCES.join(", ")}`,
        );
    }

    if (!VALID_NO_CODE_PREFERENCES.includes(data.noCodePreference)) {
        errorsFound.push(
            `No Code Preference must be one of: ${VALID_NO_CODE_PREFERENCES.join(", ")}`,
        );
    }

    // Validate enums fields + ensure that they map to database foreign keys
    if (!Object.values(ClassStanding).includes(data.classStanding)) {
        errorsFound.push("Class Standing is required and must be valid");
    }

    if (!Object.values(Major).includes(data.major)) {
        errorsFound.push("Major is required and must be valid");
    }

    if (!Object.values(ReferralSource).includes(data.referralSource)) {
        errorsFound.push("Referral Source is required and must be valid");
    }

    // Validate boolean fields
    if (typeof data.attendingWeekOfHacking !== "boolean") {
        errorsFound.push("Attending Week of Hacking must be true or false");
    }

    if (typeof data.previousAttendee !== "boolean") {
        errorsFound.push("Previous Attendee must be true or false");
    }

    return errorsFound.length > 0 ? errorsFound.join("; ") : null;
}
