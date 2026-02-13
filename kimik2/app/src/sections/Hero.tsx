import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { loadGSAP } from '../lib/gsap';

interface HeroProps {
  onOpenForm: () => void;
  onScrollToPlans: () => void;
}

export function Hero({ onOpenForm, onScrollToPlans }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initAnimation = async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Initial load animation
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

        // Background animation
        tl.fromTo(
          bgRef.current,
          { scale: 1.08, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2 }
        );

        // Headline words animation
        if (headlineRef.current) {
          const words = headlineRef.current.querySelectorAll('.word');
          tl.fromTo(
            words,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.05 },
            '-=0.8'
          );
        }

        // Subheadline
        tl.fromTo(
          subheadlineRef.current,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        );

        // CTAs
        tl.fromTo(
          ctaRef.current,
          { y: 18, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6 },
          '-=0.3'
        );

        // Footer
        tl.fromTo(
          footerRef.current,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          '-=0.2'
        );

        // Scroll-driven exit animation
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: false,
          scrub: true,
          onUpdate: (self: { progress: number }) => {
            const progress = self.progress;
            if (progress > 0) {
              gsap.to(headlineRef.current, {
                x: -18 * progress + 'vw',
                opacity: progress > 0.8 ? 1 - (progress - 0.8) * 5 : 1,
                duration: 0.1,
              });
              gsap.to(ctaRef.current, {
                y: 10 * progress + 'vh',
                opacity: progress > 0.8 ? 1 - (progress - 0.8) * 5 : 1,
                duration: 0.1,
              });
              gsap.to(bgRef.current, {
                y: -8 * progress + 'vh',
                scale: 1 + 0.06 * progress,
                duration: 0.1,
              });
            }
          },
          onLeaveBack: () => {
            gsap.to([headlineRef.current, ctaRef.current, bgRef.current], {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.3,
            });
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    };

    initAnimation();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden z-10"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0 }}
      >
        <img
          src="/hero_highway_billboard.jpg"
          alt="Highway billboard at night"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05060B]/70 via-[#05060B]/40 to-[#05060B]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-[7vw] py-20">
        {/* Headline Block */}
        <div className="max-w-[46vw] mt-[8vh]">
          <h1
            ref={headlineRef}
            className="font-display text-[clamp(44px,5vw,84px)] font-bold text-[#F2F4F8] leading-[1.1] mb-6"
          >
            <span className="word inline-block">Vitrine</span>{' '}
            <span className="word inline-block">LED</span>{' '}
            <span className="word inline-block">Veneza</span>
          </h1>

          <div className="accent-rule mb-6" />

          <p
            ref={subheadlineRef}
            className="text-[clamp(18px,1.8vw,28px)] text-[#A6AFBF] leading-relaxed"
            style={{ opacity: 0 }}
          >
            O ponto onde sua marca deixa de passar despercebida.
          </p>

          <p className="mt-4 text-[clamp(16px,1.4vw,22px)] text-[#F2F4F8]/90 font-medium">
            "Se a empresa não está aqui, não está sendo vista."
          </p>
        </div>

        {/* CTA Row */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 mt-12"
          style={{ opacity: 0 }}
        >
          <button onClick={onOpenForm} className="btn-primary flex items-center gap-2 group">
            Quero pré-cadastrar minha empresa
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={onScrollToPlans}
            className="flex items-center gap-2 text-[#FF6A3D] font-semibold hover:underline underline-offset-4 transition-all"
          >
            Ver planos
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Micro Footer */}
      <p
        ref={footerRef}
        className="absolute bottom-[6vh] left-[7vw] text-sm text-[#A6AFBF]/70 max-w-md"
        style={{ opacity: 0 }}
      >
        Projeto implantado e operado exclusivamente pela Innova Mídia LED.
      </p>
    </section>
  );
}
