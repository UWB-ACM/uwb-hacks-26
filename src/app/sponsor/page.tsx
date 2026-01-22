import UWBHacksIntroSection from "@/src/components/sponsor-page/UWBHacksIntroSection";
import WhySponsorSection from "@/src/components/sponsor-page/WhySponsorSection";
import ContactSection from "@/src/components/sponsor-page/ContactSection";

export default function SponsorUsPage() {
    return (
        <main className="bg-[linear-gradient(180deg,#0d83db,#14c5f8)] text-white">
            <UWBHacksIntroSection />
            <WhySponsorSection />

            {/* Sponsorship Packages */}
            <section>
                <h2>Sponsorship Tiers</h2>
            </section>

            <ContactSection />
        </main>
    );
}
