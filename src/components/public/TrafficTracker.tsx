"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function TrafficTracker() {
    const pathname = usePathname();

    useEffect(() => {
        if (!pathname) return;

        const trackView = async () => {
            // Don't track admin pages to keep analytics clean
            if (pathname.startsWith('/admin') || pathname.startsWith('/api')) return;

            try {
                const response = await fetch("/api/analytics/track", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ path: pathname }),
                });
                if (!response.ok) {
                    console.warn("Analytics: Tracking failed", response.status);
                }
            } catch (err) {
                // Silently fail to not disturb user experience
            }
        };

        trackView();
    }, [pathname]);

    return null;
}
