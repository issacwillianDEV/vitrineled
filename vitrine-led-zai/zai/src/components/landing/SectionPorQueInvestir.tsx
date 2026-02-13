"use client";

import { useEffect, useRef } from "react";
import { Zap, RefreshCw, Eye, Clock, TrendingUp, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SectionPorQueInvestir() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".invest-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".invest-header",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".invest-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".invest-list",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const reasons = [
    {
      icon: Zap,
      title: "Impacto Visual Imediato",
      description: "Chama atenção instantaneamente em meio à paisagem urbana",
    },
    {
      icon: Sparkles,
      title: "Comunicação Moderna",
      description: "Conteúdo dinâmico e atualizável, diferente de mídias estáticas",
    },
    {
      icon: RefreshCw,
      title: "Repetição = Lembrança",
      description: "Exposição diária constante cria memória de marca sólida",
    },
    {
      icon: Eye,
      title: "Presença no Trajeto",
      description: "Sua marca no caminho diário de milhares de consumidores",
    },
    {
      icon: TrendingUp,
      title: "Custo por Impacto",
      description: "Investimento eficiente comparado a outras mídias offline",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-black overflow-hidden"
    >
      {/* Background decorativo */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-amber-500 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Lado esquerdo - Título */}
          <div className="invest-header">
            <span className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
              Por que investir
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Por que investir em{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                LED
              </span>
              ?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              A publicidade em painel LED oferece vantagens únicas que outras mídias 
              não conseguem entregar. Entenda por que é a escolha certa para sua marca.
            </p>

            {/* Destaque */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
              <p className="text-xl text-white">
                <span className="text-amber-400 font-semibold">ROI real:</span> cada real investido 
                retorna em visibilidade e lembrança de marca.
              </p>
            </div>
          </div>

          {/* Lado direito - Lista */}
          <div className="invest-list space-y-4">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="invest-item group flex items-start gap-4 p-5 rounded-xl bg-gray-900/30 border border-gray-800/50 hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <reason.icon className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {reason.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
