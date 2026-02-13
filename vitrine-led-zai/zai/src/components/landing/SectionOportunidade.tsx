"use client";

import { useEffect, useRef } from "react";
import { Target, MapPin, Crown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SectionOportunidade() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".oport-header",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".oport-header",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".oport-card",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".oport-grid",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const opportunities = [
    {
      icon: Target,
      title: "Lembrança de Marca",
      description:
        "Sua marca será vista diariamente por milhares de pessoas. A repetição constante cria memória e preferência na hora da compra.",
      highlight: "Top of Mind",
    },
    {
      icon: MapPin,
      title: "Tráfego para o Ponto",
      description:
        "Estímulo visual constante gera curiosidade e visitas. Quem vê, lembra. Quem lembra, visita. Quem visita, compra.",
      highlight: "Conversão Real",
    },
    {
      icon: Crown,
      title: "Autoridade e Posicionamento",
      description:
        "Estar num painel LED de alta qualidade transmite profissionalismo, modernidade e liderança no seu segmento.",
      highlight: "Status Premium",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden"
    >
      {/* Linhas decorativas */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="oport-header text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
            A Oportunidade
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            A oportunidade que{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              muda o jogo
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Não é apenas publicidade. É posicionamento estratégico no principal ponto de atenção visual da região.
          </p>
        </div>

        {/* Grid de Oportunidades */}
        <div className="oport-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
          {opportunities.map((item, index) => (
            <div
              key={index}
              className="oport-card group relative p-8 rounded-2xl bg-gradient-to-b from-gray-900/80 to-gray-900/40 border border-gray-800/50 hover:border-amber-500/40 transition-all duration-500"
            >
              {/* Badge */}
              <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black text-xs font-bold">
                {item.highlight}
              </div>

              {/* Ícone */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-8 h-8 text-amber-400" />
              </div>

              {/* Conteúdo */}
              <h3 className="text-2xl font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {item.description}
              </p>

              {/* Linha decorativa inferior */}
              <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
