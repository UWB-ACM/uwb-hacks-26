"use client";

import Header from "@/src/components/header/Header";
import Footer from "@/src/components/Footer";
import HeroSection from "@/src/components/landing-page/HeroSection";
import AboutSection from "../components/landing-page/AboutSection";
import { ParallaxProvider } from "react-scroll-parallax";
import FAQSection from "@/src/components/landing-page/FAQSection";
import { LeaderboardRecord, Prize } from "../util/dataTypes";
import TracksSection from "../components/landing-page/TrackSection";

type HomePageProps = {
    hackeroonPrizes: Promise<Prize[]>;
    leaderboardData: Promise<LeaderboardRecord[]>;
};

export default function HomePage({
    hackeroonPrizes,
    leaderboardData,
}: HomePageProps) {
    return (
        <div className="flex flex-col items-center overflow-hidden">
            <div
                id="main"
                className="w-full min-h-screen flex flex-col relative overflow-hidden bg-[#0a84dc]"
            >
                <ParallaxProvider>
                    <Header
                        links={[
                            {
                                id: "dashboard",
                                name: "Dashboard",
                                url: "/dashboard",
                            },
                        ]}
                        mainPage
                        banner={true}
                    />

                    <HeroSection />
                    <AboutSection
                        hackeroonPrizes={hackeroonPrizes}
                        leaderboardData={leaderboardData}
                    />
                    <TracksSection noTrackAnimation={false}></TracksSection>
                    <FAQSection />

                    <Footer className={"bg-[#14c5f8] text-white"} />
                </ParallaxProvider>
                <a
                    id="mlh-trust-badge"
                    style={{
                        display: "block",
                        maxWidth: "100px",
                        minWidth: "60px",
                        position: "fixed",
                        right: "50px",
                        bottom: "20px",
                        width: "10%",
                        zIndex: 10000,
                    }}
                    href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white"
                    target="_blank"
                >
                    <img
                        className="hover:scale-105 duration-300 transition-transform"
                        src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-yellow.svg"
                        alt="Major League Hacking 2026 Hackathon Season"
                        style={{ width: "100%" }}
                    />
                </a>
            </div>
        </div>
    );
}
