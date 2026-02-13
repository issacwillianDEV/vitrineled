import { useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { loadGSAP } from '../lib/gsap';

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initAnimation = async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          contentRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
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

  const faqs = [
    {
      question: 'Vou pagar agora?',
      answer: 'Não. O pré-cadastro é sem custo. Você só será contactado para formalização quando atingirmos a meta de 30 empresas.',
    },
    {
      question: 'Quando começa?',
      answer: 'Após atingirmos 30 empresas e anunciarmos as datas de implantação. Você será notificado com antecedência.',
    },
    {
      question: 'Posso escolher o plano agora?',
      answer: 'Sim. Sua escolha reserva o interesse e nos ajuda a planejar a grade de exibição.',
    },
    {
      question: 'Como funciona a exclusividade por segmento?',
      answer: 'Os planos Premium e Prime garantem exclusividade na categoria. Se você é um restaurante Premium, nenhum outro restaurante poderá anunciar.',
    },
    {
      question: 'Posso indicar empresas?',
      answer: 'Sim. Fale com nosso time sobre o programa de indicação e comissão para Consultores LED.',
    },
    {
      question: 'O plano mensal tem contrato?',
      answer: 'Sim. Todos os planos têm contrato de 12 meses, inclusive com opção de pagamento mensal.',
    },
    {
      question: 'O Premium pode ter entrada + parcelamento?',
      answer: 'Sim. Oferecemos a opção de 50% de entrada + 8x no cartão, conforme condição comercial aprovada.',
    },
  ];

  return (
    <section ref={sectionRef} className="relative w-full py-20 lg:py-28 bg-[#0B0E1A] z-[100]">
      <div ref={contentRef} className="max-w-[780px] mx-auto px-6" style={{ opacity: 0 }}>
        <h2 className="font-display text-[clamp(32px,3.6vw,56px)] font-bold text-[#F2F4F8] text-center mb-12">
          Dúvidas
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="glass-card border-none px-6"
            >
              <AccordionTrigger className="text-left font-display text-lg font-semibold text-[#F2F4F8] hover:text-[#FF6A3D] transition-colors py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#A6AFBF] pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
