"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Star, Sparkles, Zap, Crown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SectionPlanos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".plan-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".plan-header",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".plan-card",
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".plan-cards",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const plans = [
    {
      id: 1,
      name: "Visibilidade Essencial",
      subtitle: "Para quem quer começar",
      icon: Zap,
      displayTime: "15s",
      dailyViews: "~200",
      loopType: "Compartilhado",
      features: [
        "1 arte estática ou vídeo simples",
        "Loop compartilhado",
        "Vigência: 30 dias",
        "Suporte básico",
      ],
      popular: false,
    },
    {
      id: 2,
      name: "Destaque Estratégico",
      subtitle: "Equilíbrio perfeito",
      icon: Star,
      displayTime: "15-20s",
      dailyViews: "~300",
      loopType: "Reduzido",
      features: [
        "Até 2 artes/vídeos",
        "Loop reduzido",
        "Possibilidade de troca no mês",
        "Vigência: 30 dias",
        "Suporte prioritário",
      ],
      popular: true,
    },
    {
      id: 3,
      name: "Impacto Premium",
      subtitle: "Máxima exposição",
      icon: Crown,
      displayTime: "30s",
      dailyViews: "~440",
      loopType: "Exclusivo",
      features: [
        "Vídeo profissional (motion/filmado)",
        "Loop altamente exclusivo",
        "Exclusividade por segmento",
        "Relatório mensal de performance",
        "Suporte VIP",
      ],
      popular: false,
      badge: "Premium",
    },
  ];

  const scrollToForm = () => {
    document.getElementById("pre-cadastro")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="planos"
      className="relative py-24 sm:py-32 bg-black overflow-hidden"
    >
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-amber-500 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-orange-500 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="plan-header text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
            Planos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Escolha o plano ideal{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              para sua marca
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Pré-cadastro sem pagamento. Escolha agora para reservar seu interesse.
          </p>
        </div>

        {/* Cards de Planos */}
        <div className="plan-cards grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`plan-card relative group rounded-2xl transition-all duration-500 ${
                plan.popular
                  ? "bg-gradient-to-b from-amber-500/20 to-orange-500/10 border-2 border-amber-500/40 scale-105 z-10"
                  : "bg-gradient-to-b from-gray-900/80 to-gray-900/40 border border-gray-800/50 hover:border-amber-500/30"
              }`}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Badge Popular */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black text-sm font-bold shadow-lg">
                  Mais Escolhido
                </div>
              )}

              {/* Badge Premium */}
              {plan.badge && (
                <div className="absolute -top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold">
                  {plan.badge}
                </div>
              )}

              <div className="p-6 sm:p-8">
                {/* Header do Plano */}
                <div className="text-center mb-6">
                  <div className={`w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center ${
                    plan.popular
                      ? "bg-gradient-to-r from-amber-500 to-orange-500"
                      : "bg-gradient-to-r from-amber-500/20 to-orange-500/10"
                  }`}>
                    <plan.icon className={`w-7 h-7 ${plan.popular ? "text-black" : "text-amber-400"}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-gray-500 text-sm">{plan.subtitle}</p>
                </div>

                {/* Stats principais */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="text-center p-3 rounded-lg bg-black/30">
                    <p className="text-amber-400 font-bold text-lg">{plan.displayTime}</p>
                    <p className="text-gray-500 text-xs">Exibição</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-black/30">
                    <p className="text-amber-400 font-bold text-lg">{plan.dailyViews}</p>
                    <p className="text-gray-500 text-xs">Exibições/dia</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-black/30">
                    <p className="text-amber-400 font-bold text-lg text-xs">{plan.loopType}</p>
                    <p className="text-gray-500 text-xs">Loop</p>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.popular ? "text-amber-400" : "text-gray-500"
                      }`} />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={scrollToForm}
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:shadow-lg hover:shadow-amber-500/25"
                      : "bg-gray-800 text-white hover:bg-gray-700"
                  }`}
                >
                  Pré-cadastrar interesse
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info adicional */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            * Todos os planos têm contrato de 12 meses. Opção de pagamento mensal disponível.
          </p>
        </div>
      </div>
    </section>
  );
}
