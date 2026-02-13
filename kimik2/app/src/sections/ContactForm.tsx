import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Send, CheckCircle } from 'lucide-react';
import { loadGSAP } from '../lib/gsap';

export function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const initAnimation = async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          leftRef.current,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        gsap.fromTo(
          rightRef.current,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }, sectionRef);

      return () => ctx.revert();
    };

    initAnimation();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section ref={sectionRef} className="relative w-full py-20 lg:py-28 bg-[#05060B] z-[120]">
      <div className="max-w-7xl mx-auto px-6 lg:px-[7vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Text */}
          <div ref={leftRef} className="flex flex-col justify-center" style={{ opacity: 0 }}>
            <h2 className="font-display text-[clamp(32px,3.6vw,56px)] font-bold text-[#F2F4F8] mb-6">
              Fale com a gente
            </h2>
            <p className="text-[#A6AFBF] text-lg leading-relaxed mb-8">
              Preencha os dados e escolha o plano de interesse. Entraremos em contato para confirmar os próximos passos.
            </p>
            <div className="accent-rule" />
          </div>

          {/* Right Form */}
          <div ref={rightRef} style={{ opacity: 0 }}>
            {submitted ? (
              <div className="glass-card p-10 text-center">
                <CheckCircle className="w-16 h-16 text-[#FF6A3D] mx-auto mb-6" />
                <h3 className="font-display text-2xl font-bold text-[#F2F4F8] mb-4">
                  Pré-cadastro enviado!
                </h3>
                <p className="text-[#A6AFBF]">
                  Entraremos em contato em breve para confirmar os próximos passos.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 lg:p-10 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-[#F2F4F8]">Nome da empresa</Label>
                    <Input
                      id="company"
                      placeholder="Sua empresa"
                      required
                      className="bg-[#05060B]/50 border-[#F2F4F8]/10 text-[#F2F4F8] placeholder:text-[#A6AFBF]/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="responsible" className="text-[#F2F4F8]">Responsável</Label>
                    <Input
                      id="responsible"
                      placeholder="Nome do responsável"
                      required
                      className="bg-[#05060B]/50 border-[#F2F4F8]/10 text-[#F2F4F8] placeholder:text-[#A6AFBF]/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp" className="text-[#F2F4F8]">WhatsApp</Label>
                    <Input
                      id="whatsapp"
                      placeholder="(31) 99999-9999"
                      required
                      className="bg-[#05060B]/50 border-[#F2F4F8]/10 text-[#F2F4F8] placeholder:text-[#A6AFBF]/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#F2F4F8]">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contato@empresa.com"
                      required
                      className="bg-[#05060B]/50 border-[#F2F4F8]/10 text-[#F2F4F8] placeholder:text-[#A6AFBF]/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="segment" className="text-[#F2F4F8]">Segmento</Label>
                    <Input
                      id="segment"
                      placeholder="Ex: Restaurante, Clínica..."
                      required
                      className="bg-[#05060B]/50 border-[#F2F4F8]/10 text-[#F2F4F8] placeholder:text-[#A6AFBF]/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="plan" className="text-[#F2F4F8]">Plano de interesse</Label>
                    <Select required>
                      <SelectTrigger className="bg-[#05060B]/50 border-[#F2F4F8]/10 text-[#F2F4F8]">
                        <SelectValue placeholder="Selecione um plano" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0B0E1A] border-[#F2F4F8]/10">
                        <SelectItem value="essential">Visibilidade Essencial</SelectItem>
                        <SelectItem value="strategic">Destaque Estratégico</SelectItem>
                        <SelectItem value="premium">Impacto Premium</SelectItem>
                        <SelectItem value="prime">Núcleo Prime LED</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-[#F2F4F8]">Observações (opcional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Alguma informação adicional..."
                    className="bg-[#05060B]/50 border-[#F2F4F8]/10 text-[#F2F4F8] placeholder:text-[#A6AFBF]/50 min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="referral" className="text-[#F2F4F8]">Indicação/Consultor (opcional)</Label>
                  <Input
                    id="referral"
                    placeholder="Quem indicou?"
                    className="bg-[#05060B]/50 border-[#F2F4F8]/10 text-[#F2F4F8] placeholder:text-[#A6AFBF]/50"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="lgpd"
                    required
                    className="mt-1 border-[#F2F4F8]/30 data-[state=checked]:bg-[#FF6A3D] data-[state=checked]:border-[#FF6A3D]"
                  />
                  <Label htmlFor="lgpd" className="text-sm text-[#A6AFBF] leading-relaxed cursor-pointer">
                    Concordo em fornecer meus dados para contato comercial sobre o Vitrine LED Veneza, conforme a LGPD.
                  </Label>
                </div>

                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Enviar pré-cadastro
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
