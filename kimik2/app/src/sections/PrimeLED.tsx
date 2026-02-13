import { useEffect, useRef } from 'react';
import { FileImage, Video, Clock, Award, Check } from 'lucide-react';
import { loadGSAP } from '../lib/gsap';

interface PrimeLEDProps {
  onOpenForm: () => void;
}

export function PrimeLED({ onOpenForm }: PrimeLEDProps) {
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
          { x: '-60vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        );

        tl.fromTo(
          rightCardRef.current,
          { x: '60vw', opacity: 0 },
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

  const benefits = [
    { icon: FileImage, text: '4 flyers/mês + 1 vídeo/mês' },
    { icon: Clock, text: 'Prioridade em horários estratégicos' },
    { icon: Video, text: 'Loop diferenciado (mais exibições)' },
    { icon: Award, text: 'Identificação como membro Prime' },
  ];

  return (
    <section ref={sectionRef} className="section-pinned z-[80]">
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.7 }}>
        <img
          src="/night_highway_clean.jpg"
          alt="Night highway"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#05060B]/55" />
      </div>

      {/* Left Premium Card */}
      <div
        ref={leftCardRef}
        className="absolute left-[7vw] top-[16vh] w-[56vw] h-[68vh] glass-card p-8 lg:p-10 flex flex-col"
        style={{ opacity: 0 }}
      >
        <span className="font-mono-label text-[#FF6A3D] mb-4">NÚCLEO PRIME LED</span>
        <h2 className="font-display text-[clamp(28px,3vw,48px)] font-bold text-[#F2F4F8] leading-tight mb-4">
          Premium/VIP
        </h2>
        <div className="accent-rule mb-6" />

        <p className="text-[#A6AFBF] text-[clamp(14px,1.1vw,18px)] mb-8">
          Para quem quer mais: produção mensal, prioridade de horário e identificação exclusiva.
        </p>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-[#F2F4F8]/5">
              <div className="p-2 rounded-lg bg-[#FF6A3D]/10 shrink-0">
                <benefit.icon className="w-5 h-5 text-[#FF6A3D]" />
              </div>
              <span className="text-[#F2F4F8] text-sm">{benefit.text}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-[#F2F4F8]/10">
          <div className="flex items-center gap-2 mb-4">
            <Check className="w-4 h-4 text-[#FF6A3D]" />
            <span className="text-sm text-[#A6AFBF]">Vagas limitadas por segmento.</span>
          </div>
          <button onClick={onOpenForm} className="btn-primary w-full sm:w-auto">
            Quero ser Prime
          </button>
        </div>
      </div>

      {/* Right Image Card */}
      <div
        ref={rightCardRef}
        className="absolute right-[7vw] top-[20vh] w-[30vw] h-[56vh] glass-card overflow-hidden"
        style={{ opacity: 0 }}
      >
        <img
          src="/inset_led_screen_closeup.jpg"
          alt="LED screen"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
