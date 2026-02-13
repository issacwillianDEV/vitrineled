import { useEffect, useRef } from 'react';
import { Store, Stethoscope, GraduationCap, UtensilsCrossed, Building2 } from 'lucide-react';
import { loadGSAP } from '../lib/gsap';

interface WhoItsForProps {
  onScrollToPlans: () => void;
}

export function WhoItsFor({ onScrollToPlans }: WhoItsForProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

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
          { scale: 1.08, opacity: 0.7 },
          { scale: 1, opacity: 1, ease: 'none' },
          0
        );

        tl.fromTo(
          leftCardRef.current,
          { x: '-55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        );

        tl.fromTo(
          rightCardRef.current,
          { x: '55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        );

        tl.to(bgRef.current, { scale: 1.06, opacity: 0, ease: 'power2.in' }, 0.7);
        tl.to(leftCardRef.current, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7);
        tl.to(rightCardRef.current, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7);
      }, sectionRef);

      return () => ctx.revert();
    };

    initAnimation();
  }, []);

  const audiences = [
    { icon: Store, text: 'Comércio local' },
    { icon: Stethoscope, text: 'Clínicas, laboratórios, farmácias' },
    { icon: GraduationCap, text: 'Escolas e cursos' },
    { icon: UtensilsCrossed, text: 'Restaurantes, supermercados, serviços' },
    { icon: Building2, text: 'Redes e grandes marcas' },
  ];

  return (
    <section ref={sectionRef} className="section-pinned z-[60]">
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.7 }}>
        <img
          src="/city_led_storefronts.jpg"
          alt="City LED storefronts"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#05060B]/50" />
      </div>

      {/* Left Audience Card */}
      <div
        ref={leftCardRef}
        className="absolute left-[7vw] top-[16vh] w-[40vw] h-[68vh] glass-card p-8 lg:p-10 flex flex-col"
        style={{ opacity: 0 }}
      >
        <span className="font-mono-label text-[#FF6A3D] mb-4">PARA QUEM É</span>
        <h2 className="font-display text-[clamp(24px,2.6vw,40px)] font-bold text-[#F2F4F8] leading-tight mb-6">
          De quem vende no bairro a quem lidera na região.
        </h2>
        <div className="accent-rule mb-8" />

        <div className="flex-1 flex flex-col justify-center gap-4">
          {audiences.map((audience, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-[#FF6A3D]/10 shrink-0">
                <audience.icon className="w-5 h-5 text-[#FF6A3D]" />
              </div>
              <p className="text-[#A6AFBF] text-[clamp(14px,1.1vw,18px)]">{audience.text}</p>
            </div>
          ))}
        </div>

        <button onClick={onScrollToPlans} className="btn-outline mt-6 w-full">
          Ver planos
        </button>
      </div>

      {/* Right Image Card */}
      <div
        ref={rightCardRef}
        className="absolute right-[7vw] top-[20vh] w-[40vw] h-[56vh] glass-card overflow-hidden"
        style={{ opacity: 0 }}
      >
        <img
          src="/inset_led_screen_detail.jpg"
          alt="LED screen detail"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
