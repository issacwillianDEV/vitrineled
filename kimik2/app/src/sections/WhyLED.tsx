import { useEffect, useRef } from 'react';
import { Eye, Zap, Repeat, TrendingUp } from 'lucide-react';
import { loadGSAP } from '../lib/gsap';

export function WhyLED() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initAnimation = async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
          },
        });

        tl.fromTo(
          bgRef.current,
          { y: '8vh', scale: 1.06, opacity: 0.7 },
          { y: 0, scale: 1, opacity: 1, ease: 'none' },
          0
        );

        tl.fromTo(
          headlineRef.current,
          { y: '-12vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        );

        tl.fromTo(
          cardRef.current,
          { y: '60vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        );

        tl.to(bgRef.current, { y: '-10vh', opacity: 0, ease: 'power2.in' }, 0.7);
        tl.to(headlineRef.current, { y: '-6vh', opacity: 0, ease: 'power2.in' }, 0.7);
        tl.to(cardRef.current, { y: '18vh', opacity: 0, ease: 'power2.in' }, 0.7);
      }, sectionRef);

      return () => ctx.revert();
    };

    initAnimation();
  }, []);

  const benefits = [
    {
      icon: Eye,
      title: 'Impacto imediato',
      description: 'Parada obrigatória para os olhos.',
    },
    {
      icon: Zap,
      title: 'Comunicação moderna',
      description: 'Vídeo, motion e atualização rápida.',
    },
    {
      icon: Repeat,
      title: 'Repetição gera lembrança',
      description: 'Quem vê todos os dias, lembra na hora de comprar.',
    },
    {
      icon: TrendingUp,
      title: 'Custo por impacto',
      description: 'Alcance massivo, investimento controlado.',
    },
  ];

  return (
    <section ref={sectionRef} className="section-pinned z-50">
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.7 }}>
        <img
          src="/night_highway_clean.jpg"
          alt="Night highway"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#05060B]/55" />
      </div>

      {/* Headline */}
      <div
        ref={headlineRef}
        className="absolute left-1/2 -translate-x-1/2 top-[14vh] text-center w-[70vw]"
        style={{ opacity: 0 }}
      >
        <h2 className="font-display text-[clamp(32px,3.6vw,56px)] font-bold text-[#F2F4F8] mb-3">
          Por que investir em LED?
        </h2>
        <p className="text-[clamp(16px,1.4vw,22px)] text-[#A6AFBF]">
          Comunicação que acompanha a rotina do seu público.
        </p>
      </div>

      {/* Benefits Card */}
      <div
        ref={cardRef}
        className="absolute left-[7vw] top-[52vh] w-[86vw] glass-card p-8 lg:p-10"
        style={{ opacity: 0 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-4">
              <div className="inline-flex p-4 rounded-2xl bg-[#FF6A3D]/10 mb-4">
                <benefit.icon className="w-6 h-6 text-[#FF6A3D]" />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#F2F4F8] mb-2">
                {benefit.title}
              </h3>
              <p className="text-[#A6AFBF] text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
