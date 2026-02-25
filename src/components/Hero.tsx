"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import Image from "next/image";
import { heroImage, logoImage } from "@/lib/siteAssets";

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const signatureRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.5 });

            tl.fromTo(
                titleRef.current,
                { opacity: 0, y: 80, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out" }
            )
                .fromTo(
                    subtitleRef.current,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
                    "-=0.4"
                )
                .fromTo(
                    ctaRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
                    "-=0.3"
                )
                .fromTo(
                    signatureRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.6, ease: "power2.out" },
                    "-=0.2"
                );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const scrollTo = (href: string) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background Image */}
            <div className="absolute -inset-x-0 -inset-y-16 z-0" data-parallax-layer data-depth="0.09">
                <Image
                    src={heroImage}
                    alt="Painel LED em rodovia no período noturno"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover scale-[1.04] brightness-[0.45] saturate-[0.82] contrast-[1.03]"
                />
                {/* Overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(1200px 700px at 10% 10%, rgba(30, 79, 163, 0.08), transparent 62%), radial-gradient(900px 640px at 90% 80%, rgba(255, 122, 26, 0.04), transparent 65%), linear-gradient(to bottom, rgba(3,6,13,0.93), rgba(3,6,13,0.84) 34%, rgba(3,6,13,0.97) 100%)",
                    }}
                />
            </div>
            <div
                className="absolute inset-x-0 bottom-0 h-32 z-[1] pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(3,6,13,0), rgba(3,6,13,0.78) 45%, rgba(3,6,13,1) 100%)",
                }}
            />

            {/* Content */}
            <div
                data-immersive-content
                className="section-shell relative z-10 w-full max-w-[min(96vw,94rem)] text-center pt-24 pb-32 md:pb-40"
            >
                <div
                    ref={titleRef}
                    className="mx-auto mb-8 w-[min(88vw,34rem)]"
                    style={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                    >
                        <Image
                            src={logoImage}
                            alt="Logo Vitrine LED Veneza"
                            width={960}
                            height={960}
                            quality={100}
                            priority
                            sizes="(max-width: 768px) 75vw, 34rem"
                            className="w-full h-auto object-contain mx-auto"
                        />
                    </motion.div>
                </div>

                <p
                    ref={subtitleRef}
                    className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-4 leading-relaxed"
                    style={{ opacity: 0 }}
                >
                    O ponto onde sua marca não passa despercebida.
                </p>

                <p className="text-primary font-semibold text-base sm:text-lg mb-10 italic">
                    &ldquo;Se a empresa não está aqui, não está sendo vista.&rdquo;
                </p>

                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-8" style={{ opacity: 0 }}>
                    <button onClick={() => scrollTo("#contact")} className="btn-glow text-base">
                        Quero pré-cadastrar minha empresa
                    </button>
                    <button onClick={() => scrollTo("#plans")} className="btn-outline text-base">
                        Ver planos
                    </button>
                </div>
            </div>

            <p
                ref={signatureRef}
                className="absolute z-10 bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 text-center text-text-muted text-xs sm:text-sm px-4 w-full max-w-3xl"
                style={{ opacity: 0 }}
            >
                Projeto implantado e operado exclusivamente pela{" "}
                <span className="text-text-secondary font-medium">Innova Mídia Led</span>.
            </p>

            {/* Scroll Indicator */}
            <div className="absolute bottom-7 md:bottom-8 left-1/2 -translate-x-1/2 z-10">
                <button
                    onClick={() => scrollTo("#about")}
                    className="scroll-indicator flex flex-col items-center gap-2 text-text-muted hover:text-primary transition-colors"
                >
                    <span className="text-xs tracking-widest uppercase">Explore</span>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M7 13l5 5 5-5" />
                        <path d="M7 6l5 5 5-5" />
                    </svg>
                </button>
            </div>
        </section>
    );
}
