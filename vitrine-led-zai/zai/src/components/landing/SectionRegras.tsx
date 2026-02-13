"use client";

import { useEffect, useRef } from "react";
import { AlertCircle, CheckCircle, Clock, CreditCard, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SectionRegras() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".regra-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".regras-list",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const rules = [
    {
      icon: CreditCard,
      title: "Pré-cadastro agora, sem pagamento",
      description: "Reserve seu interesse sem nenhum custo nesta etapa",
      type: "success",
    },
    {
      icon: Clock,
      title: "Meta de 30 empresas para início",
      description: "Ao atingir 30 empresas pré-cadastradas, liberamos cronograma de implantação e início da validação contratual",
      type: "info",
    },
    {
      icon: AlertCircle,
      title: "Contrato de 12 meses para todos os planos",
      description: "Inclusive opções com pagamento mensal",
      type: "warning",
    },
    {
      icon: Users,
      title: "Vagas limitadas por segmento",
      description: "Garantimos exclusividade para não conflitar com concorrentes diretos",
      type: "info",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-black overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Regras e{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Transparência
            </span>
          </h2>
          <p className="text-gray-400">
            Tudo claro desde o início. Sem surpresas.
          </p>
        </div>

        {/* Lista de Regras */}
        <div className="regras-list space-y-4">
          {rules.map((rule, index) => (
            <div
              key={index}
              className="regra-item flex items-start gap-4 p-5 rounded-xl bg-gray-900/50 border border-gray-800/50"
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                rule.type === "success" ? "bg-green-500/20" :
                rule.type === "warning" ? "bg-amber-500/20" :
                "bg-blue-500/20"
              }`}>
                <rule.icon className={`w-5 h-5 ${
                  rule.type === "success" ? "text-green-400" :
                  rule.type === "warning" ? "text-amber-400" :
                  "text-blue-400"
                }`} />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">{rule.title}</h3>
                <p className="text-gray-400 text-sm">{rule.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Destaque */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Dúvidas? Entre em contato pelo WhatsApp ou confira nosso FAQ abaixo.
          </p>
        </div>
      </div>
    </section>
  );
}
