export interface Event {
    time: string;
    name: string;
    location: string;
}

export const events: Record<"4/24" | "4/25" | "4/26", Event[]> = {
    "4/24": [
        {
            time: "10:00 AM - 11:35 AM",
            name: "Check-In",
            location: "ARC Overlook",
        },
        {
            time: "10:00 AM - 11:00 AM",
            name: "Snacks",
            location: "ARC Overlook",
        },
        {
            time: "11:00 AM - 12:00 PM",
            name: "Opening Ceremony",
            location: "ARC Overlook",
        },
        {
            time: "12:30 PM - 2:00 PM",
            name: "Brunch",
            location: "ARC Overlook",
        },
        {
            time: "2:00 PM - 3:00 PM",
            name: "Avanade Fireside Chat",
            location: "ARC Overlook",
        },
        {
            time: "3:30 PM - 4:30 PM",
            name: "Prototype & Pitch Workshop",
            location: "ARC Overlook",
        },
        { time: "4:45 PM - 5:30 PM", name: "Dinner", location: "ARC Overlook" },
    ],
    "4/25": [
        {
            time: "9:30 AM - 11:30 AM",
            name: "Check-In",
            location: "ARC Overlook",
        },
        {
            time: "12:00 PM - 1:30 PM",
            name: "Networking Luncheon",
            location: "ARC Overlook",
        },
        {
            time: "1:30 PM - 2:30 PM",
            name: "WSECU Credit Talk",
            location: "NCEC",
        },
        {
            time: "2:00 PM - 3:30 PM",
            name: "Club + Special Guests Tabling",
            location: "ARC Overlook",
        },
        {
            time: "2:45 PM - 3:15 PM",
            name: "Grayhats CTF Drop In Event",
            location: "NCEC",
        },
        {
            time: "3:30 PM - 4:30 PM",
            name: "InclusiveAI Workshop",
            location: "NCEC",
        },
        {
            time: "4:00 PM - 5:30 PM",
            name: "Hackeroon Stand Opens",
            location: "ARC Overlook",
        },
        { time: "4:30 PM - 5:30 PM", name: "Dinner", location: "ARC Overlook" },
        {
            time: "11:59 PM",
            name: "Devpost Initial Project Submission Due",
            location: "ARC Overlook",
        },
    ],
    "4/26": [
        {
            time: "9:00 AM - 10:00 AM",
            name: "Check-In",
            location: "ARC Overlook",
        },
        {
            time: "10:00 AM",
            name: "Hacking Concludes",
            location: "ARC Overlook",
        },
        {
            time: "10:50 AM - 12:50 PM",
            name: "Judging",
            location: "ARC Overlook",
        },
        { time: "1:00 PM - 2:30 PM", name: "Lunch", location: "ARC Overlook" },
        {
            time: "1:00 PM - 2:30 PM",
            name: "Hackeroon Stand Opens",
            location: "ARC Overlook",
        },
        {
            time: "2:00 PM - 2:30 PM",
            name: "Group Photo",
            location: "ARC Overlook",
        },
        {
            time: "2:45 PM - 4:15 PM",
            name: "Closing Ceremony + Winners",
            location: "ARC Overlook",
        },
        {
            time: "4:15 PM - 4:45 PM",
            name: "Last Chance Hackeroon Stand",
            location: "ARC Overlook",
        },
    ],
};
