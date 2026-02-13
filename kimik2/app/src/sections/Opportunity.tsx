import { useEffect, useRef } from 'react';
import { loadGSAP } from '../lib/gsap';

export function Opportunity() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);

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

        // Background animation
        tl.fromTo(
          bgRef.current,
          { scale: 1.08, y: '6vh', opacity: 0.6 },
          { scale: 1, y: 0, opacity: 1, ease: 'none' },
          0
        );

        // Left card entrance
        tl.fromTo(
          leftCardRef.current,
          { x: '-55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        );

        // Right card entrance
        tl.fromTo(
          rightCardRef.current,
          { x: '55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        );

        // Stat number entrance
        tl.fromTo(
          statRef.current,
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'none' },
          0.1
        );

        // EXIT phase (70-100%)
        tl.to(
          bgRef.current,
          { y: '-10vh', scale: 1.05, opacity: 0, ease: 'power2.in' },
          0.7
        );

        tl.to(
          leftCardRef.current,
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        );

        tl.to(
          rightCardRef.current,
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }, sectionRef);

      return () => ctx.revert();
    };

    initAnimation();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-20"
    >
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      >
        <img
          src="/city_street_led_stores.jpg"
          alt="City street at night"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#05060B]/50" />
      </div>

      {/* Left Text Card */}
      <div
        ref={leftCardRef}
        className="absolute left-[7vw] top-[18vh] w-[42vw] glass-card p-8 lg:p-10"
        style={{ opacity: 0 }}
      >
        <span className="font-mono-label text-[#FF6A3D] mb-4 block">
          A OPORTUNIDADE
        </span>
        <h2 className="font-display text-[clamp(24px,2.8vw,42px)] font-bold text-[#F2F4F8] leading-tight mb-4">
          Transforme fluxo em atenção. Atenção em lembrança. Lembrança em vendas.
        </h2>
        <div className="accent-rule mb-6" />
        <p className="text-[#A6AFBF] text-[clamp(14px,1.1vw,18px)] leading-relaxed">
          A Vitrine LED Veneza está no caminho do cliente, todos os dias. Quem passa, vê. Quem vê, lembra. Quem lembra, compra.
        </p>
      </div>

      {/* Right Stat Card */}
      <div
        ref={rightCardRef}
        className="absolute right-[7vw] top-[22vh] w-[34vw] h-[50vh] glass-card p-8 flex flex-col"
        style={{ opacity: 0 }}
      >
        <span className="font-mono-label text-[#A6AFBF] mb-4">
          ALTA RETENÇÃO DE MARCA
        </span>

        <div className="flex-1 flex flex-col justify-center items-center">
          <div ref={statRef} className="text-center" style={{ opacity: 0 }}>
            <span className="font-display text-[clamp(80px,10vw,140px)] font-bold text-[#FF6A3D] leading-none">
              +60%
            </span>
          </div>
        </div>

        <p className="text-[#A6AFBF] text-sm text-center">
          de recall em campanhas outdoor digitais com repetição diária*
        </p>

        {/* Inset Image */}
        <div className="mt-6 h-24 rounded-xl overflow-hidden">
          <img
            src="/inset_street_led_signage.jpg"
            alt="LED signage"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
