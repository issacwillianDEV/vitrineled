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

    return () => {
      mm.revert();
      ctx.revert();
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
            Preview Imersivo
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mt-4 mb-4 leading-tight">
            Prévia do ponto onde seu{" "}
            <span className="gradient-text">banner vai dominar a atenção</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            A próxima seção revela, em tempo de rolagem, como o banner ganha presença no trajeto.
            Quando você enviar a GIF final, este frame vira a versão definitiva.
          </p>
        </div>

        <div ref={frameRef} className="relative mx-auto mt-12 max-w-[min(96vw,76rem)]">
          <div className="relative rounded-[2rem] border border-primary/40 bg-[rgba(8,15,29,0.88)] p-3 md:p-4 shadow-[0_25px_80px_rgba(3,9,18,0.72)] overflow-hidden">
            <div ref={mediaRef} className="relative aspect-[16/9] rounded-[1.45rem] overflow-hidden">
              <Image
                src={bannerRodoviaImage}
                alt="Prévia do posicionamento do banner na rodovia"
                fill
                sizes="(max-width: 768px) 96vw, 76rem"
                className="object-cover"
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

            <div className="grid md:grid-cols-3 gap-3 mt-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-text-secondary">
                Entrada do bairro em ponto de alta recorrencia visual.
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-text-secondary">
                Tracao noturna e diurna com leitura forte de marca.
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-xs text-text-secondary">
                Estrutura pronta para receber GIF/video de showcase final.
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
