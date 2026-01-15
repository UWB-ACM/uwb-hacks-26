import Header from "@/src/components/header/Header";
import HeroSection from "@/src/components/landing-page/HeroSection";
import AboutSection from "../components/landing-page/AboutSection";
import "../styles/globals.css";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center overflow-hidden">
            <div
                id="main"
                className="w-full min-h-screen flex flex-col relative overflow-hidden bg-[#0a84dc]"
            >
                {/* Wrap H1 is used for the main page. */}
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
            </div>
        </div>
    );
}
