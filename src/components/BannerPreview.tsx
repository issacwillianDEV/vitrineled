"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { bannerRodoviaImage } from "@/lib/siteAssets";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BannerPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 84%",
            end: "top 18%",
            scrub: 1.05,
          },
        });

        tl.fromTo(
          headerRef.current,
          { autoAlpha: 0, y: 70, filter: "blur(10px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.65 },
          0
        )
          .fromTo(
            frameRef.current,
            {
              autoAlpha: 0,
              y: 140,
              scale: 0.78,
              rotateX: 18,
              transformPerspective: 1600,
            },
            { autoAlpha: 1, y: 0, scale: 1, rotateX: 0, duration: 1.1 },
            0.08
          )
          .fromTo(
            mediaRef.current,
            {
              clipPath: "inset(43% 36% 43% 36% round 2rem)",
              scale: 1.24,
              filter: "brightness(0.48) blur(10px)",
            },
            {
              clipPath: "inset(0% 0% 0% 0% round 1.4rem)",
              scale: 1,
              filter: "brightness(0.95) blur(0px)",
              duration: 1.15,
            },
            0.2
          )
          .fromTo(
            glowRef.current,
            { opacity: 0.1, scale: 0.72 },
            { opacity: 1, scale: 1, duration: 1.1 },
            0.22
          )
          .fromTo(
            hintRef.current,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.42 },
            0.58
          );

        gsap.to(mediaRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            end: "top 38%",
            scrub: 0.8,
          },
        });

        tl.fromTo(
          headerRef.current,
          { autoAlpha: 0, y: 42 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          0
        )
          .fromTo(
            frameRef.current,
            { autoAlpha: 0, y: 70, scale: 0.92 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.8 },
            0.08
          )
          .fromTo(
            mediaRef.current,
            { clipPath: "inset(18% 14% 18% 14% round 1.1rem)", filter: "brightness(0.56)" },
            { clipPath: "inset(0% 0% 0% 0% round 1rem)", filter: "brightness(0.92)", duration: 0.9 },
            0.12
          )
          .fromTo(
            hintRef.current,
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.3 },
            0.44
          );
      });
    }, section);

    // Mouse movement 3D tilt interaction
    const tilt = tiltRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      if (!tilt) return;
      const rect = tilt.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(tilt, {
        rotateY: x * 18,
        rotateX: -y * 18,
        ease: "power2.out",
        duration: 0.6,
        transformPerspective: 1400,
      });
    };
    const handleMouseLeave = () => {
      if (!tilt) return;
      gsap.to(tilt, { rotateY: 0, rotateX: 0, ease: "power3.out", duration: 1 });
    };

    if (tilt) {
      tilt.addEventListener("mousemove", handleMouseMove);
      tilt.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      mm.revert();
      ctx.revert();
      if (tilt) {
        tilt.removeEventListener("mousemove", handleMouseMove);
        tilt.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="preview-banner"
      data-skip-immersive-reveal
      className="relative py-28 md:py-36 overflow-hidden"
    >
      <div
        ref={glowRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(96vw,78rem)] h-[26rem] rounded-full blur-[90px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(30,79,163,0.38), rgba(255,122,26,0.18) 55%, transparent 80%)",
        }}
      />

      <div className="section-shell relative z-10 max-w-[min(96vw,108rem)]">
        <div ref={headerRef} className="text-center max-w-4xl mx-auto">
          <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase">
            Visão Tridimensional Interativa
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mt-4 mb-4 leading-tight">
            Interação tridimensional e{" "}
            <span className="gradient-text">imersão de impacto</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Passe o mouse sobre o painel e veja a modelagem 3D acompanhar o seu movimento.
            É exatamente esse nível de alta tecnologia que envolve quem visualiza seu anúncio nas vias.
          </p>
        </div>

        <div ref={frameRef} className="relative mx-auto mt-12 max-w-[min(96vw,76rem)] cursor-pointer [perspective:2000px]">
          <div ref={tiltRef} className="relative rounded-[2rem] border border-primary/40 bg-[rgba(8,15,29,0.88)] p-3 md:p-4 shadow-[0_25px_80px_rgba(3,9,18,0.72)] overflow-hidden transition-transform will-change-transform">
            <div ref={mediaRef} className="relative aspect-[16/9] rounded-[1.45rem] overflow-hidden">
              <video
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/videos/video.mp4`}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(130deg, rgba(3,6,13,0.44) 10%, rgba(3,6,13,0.12) 48%, rgba(3,6,13,0.62) 100%)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, rgba(255,255,255,0.09) 0, rgba(255,255,255,0.09) 1px, transparent 1px, transparent 4px)",
                }}
              />
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                <span className="inline-flex items-center rounded-full border border-white/25 bg-black/35 px-3 py-1 text-[10px] md:text-xs tracking-[0.18em] uppercase text-white/90">
                  Banner Preview
                </span>
              </div>
            </div>
          </div>

          <p
            ref={hintRef}
            className="text-center text-text-muted text-sm tracking-wide mt-5"
          >
            Role e veja o frame emergir em profundidade.
          </p>
        </div>
      </div>
    </section>
  );
}
