"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
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
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    poster="/hero-poster.jpg"
                >
                    <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark" />
                <div className="absolute inset-0 bg-gradient-to-r from-dark/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-primary text-sm font-medium">Pré-cadastro aberto</span>
                </motion.div>

                <h1
                    ref={titleRef}
                    className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] mb-6"
                    style={{ opacity: 0 }}
                >
                    <span className="text-white">VITRINE LED</span>
                    <br />
                    <span className="gradient-text">VENEZA</span>
                </h1>

                <p
                    ref={subtitleRef}
                    className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-4 leading-relaxed"
                    style={{ opacity: 0 }}
                >
                    O ponto onde sua marca deixa de passar despercebida.
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

                <p
                    ref={signatureRef}
                    className="text-text-muted text-xs sm:text-sm"
                    style={{ opacity: 0 }}
                >
                    Projeto implantado e operado exclusivamente pela{" "}
                    <span className="text-text-secondary font-medium">Innova Mídia Led</span>.
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
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
