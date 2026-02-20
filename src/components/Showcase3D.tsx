"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Showcase3D() {
    const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=200%",
                    scrub: 1,
                    pin: stickyRef.current,
                    anticipatePin: 1,
                },
            });

            // Initial state sequence
            tl.set(frameRef.current, {
                rotateX: 55,
                rotateY: 15,
                rotateZ: -10,
                scale: 0.45,
                yPercent: 30,
                transformPerspective: 1000,
                transformStyle: "preserve-3d",
            })
                .set(textRef.current, {
                    opacity: 0,
                    y: 80,
                    scale: 0.85,
                    rotateX: -20,
                })
                .set(glowRef.current, {
                    opacity: 0,
                    scale: 0.5,
                });

            // Animation sequence
            tl.to(frameRef.current, {
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                scale: 1,
                yPercent: 0,
                duration: 2.5,
                ease: "power3.inOut",
            }, 0)
                .to(glowRef.current, {
                    opacity: 1,
                    scale: 1.5,
                    duration: 2,
                    ease: "power2.in",
                }, 0.5)
                .to(textRef.current, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                    duration: 1.5,
                    ease: "power3.out",
                }, 1.2);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} data-skip-immersive-reveal className="relative w-full h-[300vh] bg-dark">
            <div
                ref={stickyRef}
                className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center p-6"
            >
                {/* Ambient Glow */}
                <div
                    ref={glowRef}
                    className="absolute inset-0 z-0 pointer-events-none opacity-0 flex items-center justify-center"
                >
                    <div className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-accent/20 rounded-full blur-[100px] md:blur-[150px] mix-blend-screen" />
                </div>

                {/* 3D Frame */}
                <div className="relative z-10 w-full max-w-[min(90vw,64rem)] aspect-[16/9]" style={{ perspective: "2000px" }}>
                    <div
                        ref={frameRef}
                        className="w-full h-full rounded-2xl md:rounded-[2rem] border-[1px] md:border-[2px] border-white/20 bg-dark-card shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden relative will-change-transform"
                    >
                        {/* The Video */}
                        <video
                            src="/videos/video.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-dark/40" />
                        <div className="absolute inset-0 border-[inset] border-white/10 rounded-2xl md:rounded-[2rem] pointer-events-none" />
                    </div>
                </div>

                {/* Reveal Text */}
                <div ref={textRef} className="absolute bottom-[8vh] md:bottom-[12vh] z-20 text-center px-4 w-full" style={{ perspective: "1000px" }}>
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-xs font-bold uppercase tracking-[0.2em] mb-4 backdrop-blur-md">
                        Altíssimo Impacto Visual
                    </span>
                    <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] leading-tight">
                        A Presença que <br className="md:hidden" /><span className="gradient-text">Domina a Rodovia</span>
                    </h2>
                    <p className="mt-6 text-text-secondary text-base md:text-xl max-w-2xl mx-auto drop-shadow-md">
                        Enquanto outros formatos imploram por atenção, o painel LED captura os olhares instantaneamente com movimento e altíssima definição.
                    </p>
                </div>
            </div>
        </section>
    );
}
