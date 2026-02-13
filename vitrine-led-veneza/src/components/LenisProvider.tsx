"use client";

import { useEffect, useRef } from "react";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        let lenis: any;
        let rafId: number;

        const init = async () => {
            const Lenis = (await import("@studio-freight/lenis")).default;

            lenis = new Lenis({
                duration: 1.2,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: "vertical",
                smoothWheel: true,
            });

            lenisRef.current = lenis;

            const raf = (time: number) => {
                lenis.raf(time);
                rafId = requestAnimationFrame(raf);
            };
            rafId = requestAnimationFrame(raf);
        };

        init();

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            if (lenis) lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
