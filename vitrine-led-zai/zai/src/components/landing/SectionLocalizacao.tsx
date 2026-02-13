"use client";

import { useEffect, useRef } from "react";
import { MapPin, Car, Users, Navigation } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SectionLocalizacao() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax no mapa
      gsap.to(".location-map", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        ".location-content",
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".location-content",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".location-stat",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".location-stats",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Car, value: "Alto", label: "Fluxo Veicular" },
    { icon: Users, value: "Intenso", label: "Fluxo Pedestre" },
    { icon: Navigation, value: "BR-040", label: "Rodovia Principal" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Mapa / Imagem */}
          <div className="relative location-map">
            <div className="relative rounded-3xl overflow-hidden border border-gray-800/50 shadow-2xl">
              {/* Imagem de fundo */}
              <img
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80"
                alt="Localização BR-040"
                className="w-full h-[400px] sm:h-[500px] object-cover"
              />
              
              {/* Overlay gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Pin animado */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-30" />
                  <div className="relative w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30">
                    <MapPin className="w-6 h-6 text-black" />
                  </div>
                </div>
              </div>

              {/* Label */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 border border-amber-500/20">
                  <p className="text-amber-400 font-semibold text-lg">Entrada do Veneza</p>
                  <p className="text-gray-400 text-sm">Próximo à passarela - BR-040, MG</p>
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="location-content">
            <span className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
              Localização Estratégica
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              No coração do{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                fluxo regional
              </span>
            </h2>

            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Posicionado no ponto de maior atenção visual de quem entra e sai do Veneza. 
              Uma localização que transforma passageiros em potenciais clientes.
            </p>

            {/* Stats */}
            <div className="location-stats grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="location-stat text-center p-4 rounded-xl bg-gray-900/50 border border-gray-800/50"
                >
                  <stat.icon className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                  <p className="text-white font-semibold">{stat.value}</p>
                  <p className="text-gray-500 text-xs">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Frase de destaque */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
              <p className="text-xl text-white font-medium">
                &ldquo;Principal ponto de atenção visual de quem entra e sai do Veneza.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
