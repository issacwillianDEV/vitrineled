"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Animação de entrada cinematográfica
    const ctx = gsap.context(() => {
      // Timeline principal
      const tl = gsap.timeline({ delay: 0.5 });

      // Título principal
      tl.fromTo(
        ".hero-title",
        { opacity: 0, y: 100, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out" }
      );

      // Subtítulo
      tl.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // Frase de impacto
      tl.fromTo(
        ".hero-impact",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.4"
      );

      // CTAs
      tl.fromTo(
        ".hero-cta",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
        "-=0.3"
      );

      // Assinatura
      tl.fromTo(
        ".hero-signature",
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.2"
      );

      setShowContent(true);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToForm = () => {
    document.getElementById("pre-cadastro")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Vídeo de Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
          poster="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1920&q=80"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-driving-at-night-through-a-lit-road-31866-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Overlay gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      {/* Efeito de linhas LED */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-amber-400/10 to-transparent" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />
      </div>

      {/* Partículas LED animadas */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Conteúdo Principal */}
      <div
        ref={contentRef}
        className="relative z-20 text-center px-4 max-w-6xl mx-auto"
      >
        {/* Badge Premium */}
        <div className="hero-impact inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-sm mb-8 opacity-0">
          <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          <span className="text-amber-300 text-sm font-medium tracking-wider uppercase">
            Pré-cadastro Aberto
          </span>
        </div>

        {/* Título Principal */}
        <h1 className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 opacity-0">
          <span className="block text-white">VITRINE LED</span>
          <span className="block bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent text-glow">
            VENEZA
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="hero-subtitle text-xl sm:text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto mb-6 opacity-0">
          O ponto onde sua marca deixa de passar despercebida.
        </p>

        {/* Frase de Impacto */}
        <div className="hero-impact mb-10 opacity-0">
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            <span className="text-amber-400">&ldquo;</span>
            <span className="text-white">Se a empresa não está aqui, </span>
            <span className="text-amber-400">não está sendo vista.</span>
            <span className="text-amber-400">&rdquo;</span>
          </p>
        </div>

        {/* CTAs */}
        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 opacity-0">
          <Button
            onClick={scrollToForm}
            className="btn-led px-8 py-6 text-lg font-semibold text-black rounded-xl shadow-2xl"
            size="lg"
          >
            Quero pré-cadastrar minha empresa
          </Button>
          <Button
            onClick={scrollToPlans}
            variant="outline"
            className="px-8 py-6 text-lg font-semibold text-white border-amber-500/50 hover:bg-amber-500/10 hover:border-amber-400 rounded-xl"
            size="lg"
          >
            Ver planos
          </Button>
        </div>

        {/* Assinatura */}
        <p className="hero-signature text-gray-500 text-sm opacity-0">
          Projeto implantado e operado exclusivamente pela{" "}
          <span className="text-amber-400 font-medium">Innova Mídia Led</span>
        </p>
      </div>

      {/* Indicador de Scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <ChevronDown className="w-8 h-8 text-amber-400/60" />
      </div>
    </section>
  );
}
