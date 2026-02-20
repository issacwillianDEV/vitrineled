"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export function useScrollReveal(options?: { delay?: number; y?: number; duration?: number }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (el.hasAttribute("data-immersive-content")) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                el,
                {
                    opacity: 0,
                    y: options?.y ?? 64,
                    filter: "blur(8px)",
                },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: options?.duration ?? 1.1,
                    delay: options?.delay ?? 0,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 86%",
                        end: "top 38%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, el);

        return () => ctx.revert();
    }, [options?.delay, options?.y, options?.duration]);

    return ref;
}

export function useStaggerReveal() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const children = Array.from(el.children);
        if (!children.length) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                children,
                { opacity: 0, y: 44, filter: "blur(6px)" },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 0.9,
                    stagger: 0.11,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 84%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, el);

        return () => ctx.revert();
    }, []);

    return ref;
}

export function useParallax(speed: number = 0.3) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.to(el, {
                yPercent: speed * 100,
                ease: "none",
                scrollTrigger: {
                    trigger: el,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }, el);

        return () => ctx.revert();
    }, [speed]);

    return ref;
}
