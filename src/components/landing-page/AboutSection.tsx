// General imports
import React from "react";
import Image from "next/image";

// Panel components
import Panel from "./(AboutSectionComponents)/Panel/Panel";

// For about panel
import FlyingCarWithBanner from "./(AboutSectionComponents)/FlyingCarWithBanner";

// For fun stats panel
import FunFactsContainer from "./(AboutSectionComponents)/FunFacts/FunFactsContainer";
import FunFact from "./(AboutSectionComponents)/FunFacts/FunFact";

const AboutSection = () => {
    return (
        <section>
            {/* Previous UWBHacks Fun Statistics Container */}
            <Panel
                id="funFactsPanel"
                className={`w-full border-none overflow-visible`}
            >
                <FunFactsContainer>
                    <FunFact
                        src={"/about/Cloud1.png"}
                        alt={"Number of Participants"}
                        displayText="623 Participants"
                        className="mr-100"
                    />
                    <FunFact
                        src={"/about/Cloud1.png"}
                        alt={"Number of Submitted Projects"}
                        displayText="88 Submitted Projects"
                        className="mr-100"
                    />
                    <FunFact
                        src={"/about/Cloud1.png"}
                        alt={"Number of Hackathon Weekend Events"}
                        displayText="11 Month of Hacking Events"
                        className="ml-100"
                    />
                    <FunFact
                        src={"/about/Cloud1.png"}
                        alt={
                            "Number of Hackathon Weekend Events at UWB Hacks AI 2024"}
                            displayText="14 Hackathon Weekend Events"
                            className="ml-100"
                    />
                </FunFactsContainer>
                
                <FlyingCarWithBanner />
            </Panel>
        </section>
    );
}
