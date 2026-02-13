import { useEffect, useRef } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { loadGSAP } from '../lib/gsap';

interface FinalCTAProps {
  onOpenForm: () => void;
}

export function FinalCTA({ onOpenForm }: FinalCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
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
            end: '+=120%',
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
          cardRef.current,
          { y: '70vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        );

        tl.to(bgRef.current, { scale: 1.06, opacity: 0, ease: 'power2.in' }, 0.7);
        tl.to(cardRef.current, { y: '14vh', opacity: 0, ease: 'power2.in' }, 0.7);
      }, sectionRef);

      return () => ctx.revert();
    };

    initAnimation();
  }, []);

  const whatsappNumber = '5531999999999';
  const whatsappMessage = 'Olá! Gostaria de saber mais sobre a Vitrine LED Veneza.';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section ref={sectionRef} className="section-pinned z-[110]">
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.7 }}>
        <img
          src="/night_road_billboard_clear.jpg"
          alt="Night road with billboard"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#05060B]/65" />
      </div>

      {/* CTA Card */}
      <div
        ref={cardRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[72vw] max-w-[980px] glass-card p-10 lg:p-14 text-center"
        style={{ opacity: 0 }}
      >
        <h2 className="font-display text-[clamp(28px,3.2vw,48px)] font-bold text-[#F2F4F8] leading-tight mb-8">
          Traga sua marca para onde os olhos passam.
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button onClick={onOpenForm} className="btn-primary flex items-center justify-center gap-2 group">
            Pré-cadastrar minha empresa
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Falar no WhatsApp
          </a>
        </div>

        <p className="text-sm text-[#A6AFBF]">
          Sem pagamento agora. Vagas limitadas.
        </p>
      </div>
    </section>
  );
}
