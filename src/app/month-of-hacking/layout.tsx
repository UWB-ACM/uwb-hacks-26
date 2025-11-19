import type { Metadata, Viewport } from "next";
import React from "react";
import { Inter, Rubik_Mono_One, Open_Sans } from "next/font/google";
import Header from "@/src/components/header/Header";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: ["400"],
});

const openSans = Open_Sans({
    variable: "--font-opensans",
    subsets: ["latin"],
    weight: ["400"],
});

const rubikMonoOne = Rubik_Mono_One({
    variable: "--font-rubik-mono-one",
    subsets: ["latin"],
    weight: ["400"],
});

const title = "UWB Hacks 2026";
const description =
    "Students assemble! We need your skills, NOW! Combine forces and push your potential to the limit at the 10th annual UW Bothell Hackathon, UWB Hacks: The Future 2026!";
const url = "https://uwbhacks.com/";

export const metadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: url,
    },
    twitter: {
        title,
        description,
        card: "summary_large_image",
        images: {
            url: "https://uwbhacks.com/card-image.webp",
            width: 1984,
            height: 1208,
        },
    },
    openGraph: {
        url,
        title,
        description,
        locale: "en_US",
        images: {
            url: "https://uwbhacks.com/card-image.webp",
            width: 1984,
            height: 1208,
        },
    },
    robots: "max-image-preview:large",
};

export const viewport: Viewport = {
    themeColor: "#11c4f8",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            className={`${inter.variable} ${openSans.variable} ${rubikMonoOne.variable} antialiased w-full`}
        >
            <Header links={[]} />
            {children}
        </div>
    );
}
