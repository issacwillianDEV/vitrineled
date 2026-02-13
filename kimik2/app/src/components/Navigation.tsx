import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onOpenForm: () => void;
}

export function Navigation({ onOpenForm }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Planos', href: '#planos' },
    { label: 'Por que LED', href: '#por-que-led' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 ${
          scrolled
            ? 'bg-[#05060B]/90 backdrop-blur-xl border-b border-[#F2F4F8]/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-[7vw]">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="font-display text-xl font-bold text-[#F2F4F8]">
              Vitrine LED Veneza
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[#A6AFBF] hover:text-[#F2F4F8] transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
              <button onClick={onOpenForm} className="btn-outline py-2 px-6 text-sm">
                Pré-cadastro
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-[#F2F4F8]"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[199] bg-[#05060B]/98 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-2xl text-[#F2F4F8] hover:text-[#FF6A3D] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                onOpenForm();
              }}
              className="btn-primary mt-4"
            >
              Pré-cadastro
            </button>
          </div>
        </div>
      )}
    </>
  );
}
