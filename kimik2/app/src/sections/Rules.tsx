import { useEffect, useRef } from 'react';
import { Target, FileText, Users, ClipboardCheck } from 'lucide-react';
import { loadGSAP } from '../lib/gsap';

export function Rules() {
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

        tl.fromTo(
          cardRef.current,
          { y: '60vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        );

        tl.to(bgRef.current, { scale: 1.06, opacity: 0, ease: 'power2.in' }, 0.7);
        tl.to(headlineRef.current, { y: '-6vh', opacity: 0, ease: 'power2.in' }, 0.7);
        tl.to(cardRef.current, { y: '18vh', opacity: 0, ease: 'power2.in' }, 0.7);
      }, sectionRef);

      return () => ctx.revert();
    };

    initAnimation();
  }, []);

  const rules = [
    {
      icon: Target,
      title: 'Meta de 30 empresas',
      description: 'Para liberar o cronograma de implantação.',
    },
    {
      icon: FileText,
      title: 'Contrato de 12 meses',
      description: 'Com opção de pagamento mensal.',
    },
    {
      icon: Users,
      title: 'Vagas limitadas',
      description: 'Por segmento para garantir exclusividade.',
    },
    {
      icon: ClipboardCheck,
      title: 'Validação contratual',
      description: 'Após o fechamento da rodada.',
    },
  ];

  return (
    <section ref={sectionRef} className="section-pinned z-[90]">
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.7 }}>
        <img
          src="/hero_highway_billboard.jpg"
          alt="Highway billboard"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#05060B]/60" />
      </div>

      {/* Headline */}
      <div
        ref={headlineRef}
        className="absolute left-1/2 -translate-x-1/2 top-[14vh] text-center w-[70vw]"
        style={{ opacity: 0 }}
      >
        <h2 className="font-display text-[clamp(32px,3.6vw,56px)] font-bold text-[#F2F4F8] mb-3">
          Transparência desde o primeiro passo
        </h2>
        <p className="text-[clamp(18px,1.6vw,26px)] text-[#FF6A3D] font-medium">
          Pré-cadastro agora, sem pagamento.
        </p>
      </div>

      {/* Rules Card */}
      <div
        ref={cardRef}
        className="absolute left-[7vw] top-[52vh] w-[86vw] glass-card p-8 lg:p-10"
        style={{ opacity: 0 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rules.map((rule, index) => (
            <div key={index} className="text-center p-4">
              <div className="inline-flex p-4 rounded-2xl bg-[#FF6A3D]/10 mb-4">
                <rule.icon className="w-6 h-6 text-[#FF6A3D]" />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#F2F4F8] mb-2">
                {rule.title}
              </h3>
              <p className="text-[#A6AFBF] text-sm">{rule.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
