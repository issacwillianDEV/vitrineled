import { useEffect, useRef } from 'react';
import { loadGSAP } from '../lib/gsap';

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const initAnimation = async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          footerRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }, footerRef);

      return () => ctx.revert();
    };

    initAnimation();
  }, []);

  const links = ['Planos', 'FAQ', 'Contato', 'Termos'];

  return (
    <footer
      ref={footerRef}
      className="relative w-full py-12 bg-[#05060B] border-t border-[#F2F4F8]/5 z-[130]"
      style={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-[7vw]">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <h3 className="font-display text-2xl font-bold text-[#F2F4F8] mb-6">
            Vitrine LED Veneza
          </h3>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6 mb-8">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-[#A6AFBF] hover:text-[#FF6A3D] transition-colors text-sm"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-[#A6AFBF]/60 text-sm">
            © 2026 Innova Mídia LED. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
