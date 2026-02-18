"use client";

import Header from "@/src/components/header/Header";
import Footer from "@/src/components/Footer";
import HeroSection from "@/src/components/landing-page/HeroSection";
import AboutSection from "../components/landing-page/AboutSection";
import { ParallaxProvider } from "react-scroll-parallax";
import FAQSection from "@/src/components/landing-page/FAQSection";

export default function HomePage() {
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
                    <AboutSection />
                    <FAQSection />

                    <Footer className={"bg-[#14c5f8] text-white"} />
                </ParallaxProvider>
            </div>
        </div>
    );
}
