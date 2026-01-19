"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Footer() {
    const path = usePathname();

    return (
        <footer
            className={`flex flex-col justify-center items-center text-black py-2 lg:py-4 text-[0.6rem] md:text-[0.8rem] lg:text-[0.9rem] xl:text-base ${path == "/" && "bg-[#439531] text-white/80"}`}
        >
            <p className="text-center">&copy; 2026 UWB ACM</p>
            <div className="flex gap-5">
                <Link href="/tos">Terms of Service</Link>
                <Link href="/privacy">Privacy Policy</Link>
            </div>
        </footer>
    );
}

export default Footer;
