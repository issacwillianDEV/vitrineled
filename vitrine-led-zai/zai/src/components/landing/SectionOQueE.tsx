"use client";

import { useEffect, useRef } from "react";
import { Sparkles, Eye, Brain, TrendingUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SectionOQueE() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".oque-title",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".oque-title",
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".oque-card",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".oque-cards",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      icon: Eye,
      title: "Fluxo",
      description: "Milhares de pessoas passam diariamente pela BR-040",
    },
    {
      icon: Sparkles,
      title: "Atenção",
      description: "O painel LED captura olhares com conteúdo dinâmico",
    },
    {
      icon: Brain,
      title: "Lembrança",
      description: "Repetição cria memória e reconhecimento de marca",
    },
    {
      icon: TrendingUp,
      title: "Vendas",
      description: "A lembrança gera visitas, conversões e resultados",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-black overflow-hidden"
    >
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="oque-title text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            O que é o{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Projeto
            </span>
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto">
            Uma vitrine digital de alta visibilidade que transforma o fluxo da BR-040 
            em oportunidade real de negócio para sua marca.
          </p>
        </div>

        {/* Cards de Fluxo */}
        <div className="oque-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="oque-card group relative p-6 rounded-2xl bg-gradient-to-b from-gray-900/50 to-gray-900/30 border border-gray-800/50 hover:border-amber-500/30 transition-all duration-500"
            >
              {/* Número */}
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-black font-bold text-sm">
                {index + 1}
              </div>

              {/* Ícone */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-7 h-7 text-amber-400" />
              </div>

              {/* Conteúdo */}
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {step.description}
              </p>

              {/* Conector (exceto último) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-amber-500/50 to-transparent" />
              )}
            </div>
          ))}
        </div>

        {/* Frase de Destaque */}
        <div className="mt-16 text-center">
          <p className="text-2xl sm:text-3xl font-light text-gray-300">
            <span className="text-amber-400">Transformamos</span> quem passa em{" "}
            <span className="text-amber-400">quem compra</span>
          </p>
        </div>
      </div>
    </section>
  );
}
