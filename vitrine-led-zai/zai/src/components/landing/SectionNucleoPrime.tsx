"use client";

import { useEffect, useRef } from "react";
import { Crown, Sparkles, Video, Image, Clock, Star, Shield } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SectionNucleoPrime() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".prime-content",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".prime-content",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".prime-benefit",
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".prime-benefits",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Efeito de brilho no título
      gsap.to(".prime-shine", {
        backgroundPosition: "200% center",
        duration: 3,
        repeat: -1,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const benefits = [
    { icon: Image, text: "4 flyers/mês" },
    { icon: Video, text: "1 vídeo/mês" },
    { icon: Clock, text: "Prioridade em horários estratégicos" },
    { icon: Sparkles, text: "Loop diferenciado (mais exibições)" },
    { icon: Crown, text: "Identificação como membro Prime" },
    { icon: Shield, text: "Exclusividade por segmento" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden"
    >
      {/* Background premium */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-amber-500/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo */}
          <div className="prime-content">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-6">
              <Crown className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-semibold">Núcleo Prime LED</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Para marcas que querem{" "}
              <span className="prime-shine bg-gradient-to-r from-amber-300 via-orange-300 to-amber-300 bg-clip-text text-transparent bg-[length:200%_auto]">
                destaque máximo
              </span>
            </h2>

            <p className="text-gray-400 text-lg mb-8">
              O Núcleo Prime LED é um grupo exclusivo de empresas que recebem benefícios 
              premium, conteúdo mensal incluso e prioridade máxima na exibição. 
              <span className="text-amber-400 font-semibold"> Vagas limitadas por segmento.</span>
            </p>

            {/* Kit Business */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-gray-900/80 to-gray-900/50 border border-amber-500/20 mb-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" />
                Kit Business Mensal Incluído
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                    <benefit.icon className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Condição especial */}
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <p className="text-amber-300 text-sm">
                <span className="font-semibold">Condição especial:</span> 50% de entrada + 8x no cartão
              </p>
            </div>
          </div>

          {/* Card Visual */}
          <div className="relative">
            <div className="relative p-8 rounded-2xl bg-gradient-to-b from-amber-500/10 to-orange-500/5 border border-amber-500/30 shadow-2xl">
              {/* Badge de exclusividade */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Crown className="w-10 h-10 text-black" />
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Núcleo Prime LED</h3>
                <p className="text-gray-400">Membros VIP</p>
              </div>

              {/* Contador de vagas */}
              <div className="text-center p-6 rounded-xl bg-black/40 mb-6">
                <p className="text-gray-500 text-sm mb-2">Vagas disponíveis</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-4xl font-bold text-amber-400">0</span>
                  <span className="text-2xl text-gray-500">/</span>
                  <span className="text-2xl text-gray-400">10</span>
                </div>
                <p className="text-gray-500 text-xs mt-2">empresas Prime</p>
              </div>

              {/* Benefícios em lista */}
              <div className="prime-benefits space-y-3">
                {["Máxima visibilidade", "Conteúdo mensal incluso", "Exclusividade garantida"].map((item, index) => (
                  <div
                    key={index}
                    className="prime-benefit flex items-center gap-3 p-3 rounded-lg bg-gray-900/50"
                  >
                    <CheckIcon className="w-5 h-5 text-amber-400" />
                    <span className="text-white text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href="#pre-cadastro"
                className="mt-6 w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold text-center block hover:shadow-lg hover:shadow-amber-500/25 transition-all"
              >
                Quero fazer parte
              </a>
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-4 bg-amber-500/10 blur-3xl -z-10 rounded-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
