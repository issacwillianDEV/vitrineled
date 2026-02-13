import { useEffect, useRef } from 'react';
import { Check, Star } from 'lucide-react';
import { loadGSAP } from '../lib/gsap';

interface PlansProps {
  onOpenForm: () => void;
}

export function Plans({ onOpenForm }: PlansProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initAnimation = async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=140%',
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
          headlineRef.current,
          { y: '-12vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        );

        const cards = cardsRef.current?.querySelectorAll('.plan-card');
        if (cards) {
          tl.fromTo(
            cards[0],
            { x: '-40vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'none' },
            0
          );
          tl.fromTo(
            cards[1],
            { y: '60vh', opacity: 0 },
            { y: 0, opacity: 1, ease: 'none' },
            0
          );
          tl.fromTo(
            cards[2],
            { x: '40vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'none' },
            0
          );
        }

        tl.to(bgRef.current, { scale: 1.06, opacity: 0, ease: 'power2.in' }, 0.7);
        tl.to(headlineRef.current, { y: '-6vh', opacity: 0, ease: 'power2.in' }, 0.7);
        if (cards) {
          tl.to(cards, { y: '14vh', opacity: 0, ease: 'power2.in' }, 0.7);
        }
      }, sectionRef);

      return () => ctx.revert();
    };

    initAnimation();
  }, []);

  const plans = [
    {
      name: 'Visibilidade Essencial',
      duration: '15s',
      displays: '~200 exibições/dia',
      features: ['1 arte ou vídeo', 'Loop compartilhado', 'Vigência 30 dias'],
      cta: 'Escolher esse',
      highlighted: false,
    },
    {
      name: 'Destaque Estratégico',
      duration: '15-20s',
      displays: '~300 exibições/dia',
      features: ['Até 2 artes/vídeos', 'Loop reduzido', 'Troca no mês', 'Vigência 30 dias'],
      cta: 'Escolher esse',
      highlighted: false,
    },
    {
      name: 'Impacto Premium',
      duration: '30s',
      displays: '~440 exibições/dia',
      features: [
        'Vídeo profissional (motion/filmado)',
        'Exclusividade por segmento',
        'Relatório mensal',
        'Loop altamente exclusivo',
      ],
      cta: 'Quero Premium',
      highlighted: true,
    },
  ];

  return (
    <section ref={sectionRef} className="section-pinned z-[70]">
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.7 }}>
        <img
          src="/night_road_billboard_clear.jpg"
          alt="Night road with billboard"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#05060B]/60" />
      </div>

      {/* Headline */}
      <div
        ref={headlineRef}
        className="absolute left-1/2 -translate-x-1/2 top-[10vh] text-center w-[80vw]"
        style={{ opacity: 0 }}
      >
        <h2 className="font-display text-[clamp(32px,3.6vw,56px)] font-bold text-[#F2F4F8] mb-3">
          Escolha seu plano
        </h2>
        <p className="text-[clamp(16px,1.4vw,22px)] text-[#A6AFBF]">
          Exibições diárias, loop e exclusividade por segmento.
        </p>
      </div>

      {/* Plan Cards */}
      <div
        ref={cardsRef}
        className="absolute left-[7vw] top-[48vh] w-[86vw] grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`plan-card glass-card p-6 lg:p-8 flex flex-col ${plan.highlighted ? 'border-[#FF6A3D]/50 ring-2 ring-[#FF6A3D]/20' : ''
              }`}
            style={{ opacity: 0 }}
          >
            {plan.highlighted && (
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-[#FF6A3D] fill-[#FF6A3D]" />
                <span className="font-mono-label text-[#FF6A3D]">MAIS POPULAR</span>
              </div>
            )}

            <div className="h-1 w-12 bg-[#FF6A3D] rounded-full mb-4" />

            <h3 className="font-display text-xl font-bold text-[#F2F4F8] mb-2">
              {plan.name}
            </h3>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-[#FF6A3D]">{plan.duration}</span>
              <span className="text-sm text-[#A6AFBF]">• {plan.displays}</span>
            </div>

            <ul className="flex-1 space-y-3 mb-6">
              {plan.features.map((feature, fIndex) => (
                <li key={fIndex} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#FF6A3D] mt-0.5 shrink-0" />
                  <span className="text-[#A6AFBF] text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={onOpenForm}
              className={plan.highlighted ? 'btn-primary w-full' : 'btn-outline w-full'}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
