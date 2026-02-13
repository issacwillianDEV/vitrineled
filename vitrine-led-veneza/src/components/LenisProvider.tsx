"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<{
        on: (event: string, cb: () => void) => void;
        off: (event: string, cb: () => void) => void;
        raf: (time: number) => void;
        destroy: () => void;
    } | null>(null);

    useEffect(() => {
        let lenis: {
            on: (event: string, cb: () => void) => void;
            off: (event: string, cb: () => void) => void;
            raf: (time: number) => void;
            destroy: () => void;
        } | null = null;
        let rafId: number;
        let onLenisScroll: (() => void) | null = null;

        const init = async () => {
            const Lenis = (await import("@studio-freight/lenis")).default;
            const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

            lenis = new Lenis({
                duration: isTouch ? 0.9 : 0.82,
                easing: (t: number) => 1 - Math.pow(1 - t, 4),
                orientation: "vertical",
                smoothWheel: true,
                wheelMultiplier: isTouch ? 0.9 : 1.03,
            });

            lenisRef.current = lenis;
            onLenisScroll = () => ScrollTrigger.update();
            lenis.on("scroll", onLenisScroll);

            const raf = (time: number) => {
                if (!lenis) return;
                lenis.raf(time);
                rafId = requestAnimationFrame(raf);
            };
            rafId = requestAnimationFrame(raf);
        };

        init();

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            if (lenis && onLenisScroll) lenis.off("scroll", onLenisScroll);
            if (lenis) lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
