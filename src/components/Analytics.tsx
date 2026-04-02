"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
    interface Window {
        dataLayer: unknown[];
    }
}

export function Analytics() {
    useEffect(() => {
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: unknown[]) {
            window.dataLayer.push(args);
        }
        gtag("js", new Date());
        gtag("config", "G-Q3ES8YLK92");
    }, []);

    return (
        <>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-Q3ES8YLK92"
                strategy="afterInteractive"
            />
        </>
    );
}
