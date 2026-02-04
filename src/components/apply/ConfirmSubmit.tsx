import Image from "next/image";
import Cloud3 from "@/public/clouds/Cloud3.png";

    return (
        <div className="min-h-screen flex items-center justify-center relative">
            {/* Left Cloud */}
            <Image
                src={Cloud3}
                alt=""
                className="absolute z-0 top-20 -left-20 md:-left-20 lg:-left-16 scale-x-[-1] opacity-40 w-1/2 md:w-1/3 lg:w-1/4"
            />

            {/* Right Cloud */}
            <Image
                src={Cloud3}
                alt=""
                className="absolute z-0 bottom-40 right-3 md:right-2 lg:right-1 opacity-40 w-1/2 md:w-1/3 lg:w-1/4"
            />

                {/* Submission confirmation message */}
                {/* A subcontainer is used to ensure the is displayed over the clouds */}
                <div className="z-10 text-center mt-20 sm:mt-15">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 font-sans">
                        Thank you for submitting your application!
                    </h1>
                    <p className="mt-4 text-sm sm:text-lg md:text-xl lg:text-2xl">
                        See you for UWB Hacks 2026: Hacks the Future
                    </p>
                    <p className="m-2 text-sm sm:text-lg md:text-xl lg:text-2xl font-bold">
                        Friday, April 24 - Sunday, April 26, 2026
                    </p>
                    <p>
                        Remember to sign up on{" "}
                        <Link
                            className="underline text-blue-500 font-bold"
                            href="https://uwb-hacks-the-future.devpost.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Devpost
                        </Link>
                        !
                    </p>

                    <button
                        className="mx-auto mt-8 min-w-[120px] bg-white hover:bg-gray-100 text-[#0d83db] text-sm sm:text-base md:text-lg lg:text-xl font-bold py-3 px-6 sm:px-8 md:px-10 rounded-full flex items-center justify-center"
                        onClick={onEdit}
                    >
                        Edit Application
                    </button>
                </div>
            </div>
        </>
    );
}
