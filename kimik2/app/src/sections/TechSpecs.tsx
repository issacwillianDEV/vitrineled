import { useEffect, useRef } from 'react';
import { Monitor, Video, Sun } from 'lucide-react';
import { loadGSAP } from '../lib/gsap';

export function TechSpecs() {
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

        // Background
        tl.fromTo(
          bgRef.current,
          { scale: 1.08, opacity: 0.7 },
          { scale: 1, opacity: 1, ease: 'none' },
          0
        );

        // Left card
        tl.fromTo(
          leftCardRef.current,
          { x: '-55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        );

        // Right card
        tl.fromTo(
          rightCardRef.current,
          { x: '55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        );

        // EXIT
        tl.to(bgRef.current, { scale: 1.06, opacity: 0, ease: 'power2.in' }, 0.7);
        tl.to(leftCardRef.current, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7);
        tl.to(rightCardRef.current, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7);
      }, sectionRef);

      return () => ctx.revert();
    };

    initAnimation();
  }, []);

  const specs = [
    { icon: Monitor, text: 'Pitch P5 — imagem nítida de perto e de longe' },
    { icon: Video, text: 'Vídeos, motion e artes estáticas' },
    { icon: Sun, text: 'Excelente legibilidade dia e noite' },
  ];

  return (
    <section ref={sectionRef} className="section-pinned z-40">
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.7 }}>
        <img
          src="/night_road_billboard_clear.jpg"
          alt="Night road with billboard"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#05060B]/50" />
      </div>

      {/* Left Spec Card */}
      <div
        ref={leftCardRef}
        className="absolute left-[7vw] top-[16vh] w-[40vw] h-[68vh] glass-card p-8 lg:p-10 flex flex-col"
        style={{ opacity: 0 }}
      >
        <span className="font-mono-label text-[#FF6A3D] mb-4">TECNOLOGIA</span>
        <h2 className="font-display text-[clamp(24px,2.6vw,40px)] font-bold text-[#F2F4F8] leading-tight mb-6">
          Painel 5m × 3m em alta definição
        </h2>
        <div className="accent-rule mb-8" />

        <div className="flex-1 flex flex-col justify-center gap-6">
          {specs.map((spec, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#FF6A3D]/10 shrink-0">
                <spec.icon className="w-5 h-5 text-[#FF6A3D]" />
              </div>
              <p className="text-[#A6AFBF] text-[clamp(14px,1.1vw,18px)]">{spec.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Image Card */}
      <div
        ref={rightCardRef}
        className="absolute right-[7vw] top-[20vh] w-[40vw] h-[56vh] glass-card overflow-hidden"
        style={{ opacity: 0 }}
      >
        <img
          src="/inset_led_screen_closeup.jpg"
          alt="LED screen closeup"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-xs text-[#A6AFBF] bg-[#05060B]/80 px-3 py-2 rounded-lg backdrop-blur-sm">
            Imagem real de painel LED urbano
          </p>
        </div>
      </div>
    </section>
  );
}
