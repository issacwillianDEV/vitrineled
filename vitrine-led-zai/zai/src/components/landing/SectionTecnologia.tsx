"use client";

import { useEffect, useRef } from "react";
import { Monitor, Sun, Moon, Film, Image, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SectionTecnologia() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tech-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".tech-header",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".tech-spec",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".tech-specs",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animação do painel LED central
      gsap.fromTo(
        ".led-display",
        { opacity: 0, scale: 0.8, rotateY: -15 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1.2,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".led-display",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const specs = [
    { icon: Monitor, label: "Tamanho", value: "5m x 3m" },
    { icon: Zap, label: "Resolução", value: "P5 HD" },
    { icon: Sun, label: "Dia", value: "Alta Visibilidade" },
    { icon: Moon, label: "Noite", value: "Brilho Intenso" },
  ];

  const formats = [
    { icon: Film, label: "Vídeos Dinâmicos" },
    { icon: Image, label: "Artes Estáticas" },
    { icon: Zap, label: "Motion Graphics" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden"
    >
      {/* Grid de fundo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,200,50,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,200,50,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="tech-header text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
            Tecnologia
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Especificações{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              LED Premium
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Painel de alta definição com visibilidade perfeita em qualquer condição de iluminação.
          </p>
        </div>

        {/* Display LED Central */}
        <div className="flex justify-center mb-16">
          <div className="led-display relative">
            {/* Moldura do painel */}
            <div className="relative w-[280px] sm:w-[350px] md:w-[420px] aspect-[5/3] bg-black rounded-lg border-4 border-gray-800 shadow-2xl overflow-hidden">
              {/* Conteúdo do painel */}
              <div className="absolute inset-2 bg-gradient-to-br from-gray-900 to-black rounded flex items-center justify-center overflow-hidden">
                {/* Simulação de conteúdo LED */}
                <div className="text-center p-4">
                  <div className="text-amber-400 text-3xl sm:text-4xl md:text-5xl font-bold mb-2 animate-pulse">
                    LED
                  </div>
                  <div className="text-white text-sm sm:text-base font-medium">
                    Sua marca aqui
                  </div>
                </div>
                
                {/* Linhas de scan simuladas */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,200,50,0.3) 2px, rgba(255,200,50,0.3) 4px)',
                  }}
                />
              </div>

              {/* Reflexo */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            </div>

            {/* Glow */}
            <div className="absolute -inset-4 bg-amber-500/10 blur-3xl -z-10" />
          </div>
        </div>

        {/* Specs Grid */}
        <div className="tech-specs grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {specs.map((spec, index) => (
            <div
              key={index}
              className="tech-spec group p-6 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-amber-500/30 transition-all duration-300 text-center"
            >
              <spec.icon className="w-8 h-8 text-amber-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-gray-500 text-sm mb-1">{spec.label}</p>
              <p className="text-white font-semibold text-lg">{spec.value}</p>
            </div>
          ))}
        </div>

        {/* Formatos Suportados */}
        <div className="flex flex-wrap justify-center gap-4">
          {formats.map((format, index) => (
            <div
              key={index}
              className="tech-spec flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/50 border border-gray-800/50"
            >
              <format.icon className="w-4 h-4 text-amber-400" />
              <span className="text-gray-300 text-sm">{format.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
