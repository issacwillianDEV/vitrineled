"use client";

import { useEffect, useRef } from "react";
import { Building2, Stethoscope, GraduationCap, UtensilsCrossed, ShoppingBag, Building } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SectionParaQuem() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".paraquem-header",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".paraquem-header",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".paraquem-card",
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".paraquem-grid",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const segments = [
    {
      icon: Building2,
      title: "Comércio Local",
      examples: "Lojas, boutiques, prestações de serviço",
    },
    {
      icon: Stethoscope,
      title: "Saúde",
      examples: "Clínicas, laboratórios, farmácias, consultórios",
    },
    {
      icon: GraduationCap,
      title: "Educação",
      examples: "Escolas, cursos, faculdades, idiomas",
    },
    {
      icon: UtensilsCrossed,
      title: "Alimentação",
      examples: "Restaurantes, lanchonetes, delivery",
    },
    {
      icon: ShoppingBag,
      title: "Varejo",
      examples: "Supermercados, atacarejo, conveniência",
    },
    {
      icon: Building,
      title: "Grandes Marcas",
      examples: "Redes regionais e nacionais",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="paraquem-header text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
            Público-Alvo
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Para quem é a{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Vitrine LED
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Empresas de todos os portes que querem aumentar visibilidade e atrair mais clientes da região.
          </p>
        </div>

        {/* Grid de Segmentos */}
        <div className="paraquem-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {segments.map((segment, index) => (
            <div
              key={index}
              className="paraquem-card group p-6 rounded-xl bg-gray-900/50 border border-gray-800/50 hover:border-amber-500/40 transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <segment.icon className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">
                {segment.title}
              </h3>
              <p className="text-gray-500 text-xs">
                {segment.examples}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            Se sua empresa quer ser lembrada, este é o lugar.
          </p>
          <a
            href="#pre-cadastro"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all"
          >
            Reservar minha vaga
          </a>
        </div>
      </div>
    </section>
  );
}
