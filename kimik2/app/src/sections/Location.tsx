import { useEffect, useRef } from 'react';
import { MapPin, Users, Route } from 'lucide-react';
import { loadGSAP } from '../lib/gsap';

export function Location() {
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

        // Background
        tl.fromTo(
          bgRef.current,
          { x: '-10vw', scale: 1.06, opacity: 0.7 },
          { x: 0, scale: 1, opacity: 1, ease: 'none' },
          0
        );

        // Headline
        tl.fromTo(
          headlineRef.current,
          { y: '-10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        );

        // Info card
        tl.fromTo(
          cardRef.current,
          { y: '60vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        );

        // EXIT
        tl.to(
          bgRef.current,
          { x: '10vw', opacity: 0, ease: 'power2.in' },
          0.7
        );

        tl.to(
          headlineRef.current,
          { y: '-6vh', opacity: 0, ease: 'power2.in' },
          0.7
        );

        tl.to(
          cardRef.current,
          { y: '18vh', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }, sectionRef);

      return () => ctx.revert();
    };

    initAnimation();
  }, []);

  const columns = [
    {
      icon: MapPin,
      title: 'Ponto',
      description: 'Próximo à passarela / entrada principal',
    },
    {
      icon: Users,
      title: 'Público',
      description: 'Alto fluxo de veículos e pedestres',
    },
    {
      icon: Route,
      title: 'Cobertura',
      description: 'Quem entra e sai passa por aqui',
    },
  ];

  return (
    <section ref={sectionRef} className="section-pinned z-30">
      {/* Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.7 }}
      >
        <img
          src="/highway_dusk_perspective.jpg"
          alt="Highway at dusk"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#05060B]/55" />
      </div>

      {/* Headline */}
      <div
        ref={headlineRef}
        className="absolute left-[7vw] top-[14vh]"
        style={{ opacity: 0 }}
      >
        <h2 className="font-display text-[clamp(32px,3.6vw,56px)] font-bold text-[#F2F4F8] mb-2">
          Localização estratégica
        </h2>
        <p className="text-[clamp(18px,1.6vw,26px)] text-[#A6AFBF]">
          BR-040 • Entrada do Veneza (MG)
        </p>
      </div>

      {/* Info Card */}
      <div
        ref={cardRef}
        className="absolute left-[7vw] top-[58vh] w-[86vw] glass-card p-8 lg:p-10"
        style={{ opacity: 0 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {columns.map((col, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#FF6A3D]/10">
                <col.icon className="w-6 h-6 text-[#FF6A3D]" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-[#F2F4F8] mb-1">
                  {col.title}
                </h3>
                <p className="text-[#A6AFBF] text-sm">{col.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-[#F2F4F8]/10">
          <p className="text-[#F2F4F8] text-[clamp(16px,1.3vw,20px)] font-medium text-center">
            Principal ponto de atenção visual de quem entra e sai do Veneza.
          </p>
        </div>
      </div>
    </section>
  );
}
