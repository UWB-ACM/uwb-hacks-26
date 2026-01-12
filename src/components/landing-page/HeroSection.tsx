export default function HeroSection() {
    return (
        <div className="flex flex-col items-center bg-[linear-gradient(180deg,#0d83db,#14c5f8)]">

            {/* TOP HERO GRID */}
            <div className="grid grid-cols-[auto_1fr_auto] w-full items-start pt-8">

                {/* LEFT: Cloud */}
                <div className="flex justify-start">
                    <img
                        src="Cloud 3 - Background.png"
                        className="w-72 object-contain scale-x-[-1] -mt-32 -ml-6"
                    />
                </div>

                {/* CENTER: Main Content */}
                <div className="flex justify-center">
                    <div className="flex flex-col text-center px-6 pt-20 sm:px-12 md:px-20 max-w-4xl">

                        <h1 className="text-white font-bold text-4xl font-sans">
                            UWB HACKS: The Future 2026
                        </h1>

                        <p className="text-white mt-4 text-sm sm:text-lg md:text-xl lg:text-2xl mx-auto">
                            Halle comes to us from the future, traveling back to our time with a purpose:
                            to help us build what comes next. She knows tomorrow is full of opportunities,
                            but it's up to us to create it. Together, we can build our future.
                        </p>

                        <h2 className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl mt-4 font-sans">
                            Friday, April 24 - Sunday, April 26, 2026
                        </h2>

                        {/* Buttons */}
                        <div className="flex flex-wrap justify-center gap-4 mt-6 w-full max-w-lg mx-auto">
                            <button className="flex-1 min-w-[120px] bg-white hover:bg-gray-100 text-[#0d83db] text-sm sm:text-base md:text-lg lg:text-xl font-bold py-2 px-6 sm:px-8 md:px-10 rounded-full">
                                REGISTRATION
                            </button>

                            <button className="flex-1 min-w-[120px] bg-white hover:bg-gray-100 text-[#0d83db] text-sm sm:text-base md:text-lg lg:text-xl font-bold py-2 px-6 sm:px-8 md:px-10 rounded-full">
                                SPONSORS
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-32 sm:w-48 md:w-64 lg:w-80" />
            </div>

            <div className="w-screen flex flex-row items-end">
                <img src="City - Background.png" className="w-1/4 -ml-16" />

                <div className="flex flex-col items-center relative w-2/4">
                    <img src="Train - Background.png" className="" />
                    <img src="Bridge - Background.png" className="" />
                </div>

                <img src="City - Background.png" className="w-1/4 -mr-16" />
            </div>
        </div>
    );
}
