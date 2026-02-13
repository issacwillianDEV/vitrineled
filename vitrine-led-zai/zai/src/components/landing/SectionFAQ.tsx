"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FAQItem {
  question: string;
  answer: string;
}

export default function SectionFAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".faq-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".faq-header",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".faq-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".faq-list",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const faqs: FAQItem[] = [
    {
      question: "Vou pagar agora?",
      answer: "Não. O pré-cadastro é gratuito e sem compromisso. O pagamento só acontece após batermos a meta de 30 empresas e você confirmar sua participação.",
    },
    {
      question: "Quando começa a exibição?",
      answer: "Após atingirmos 30 empresas pré-cadastradas, anunciaremos as datas de implantação e início das exibições. Você será notificado com antecedência.",
    },
    {
      question: "Posso escolher o plano agora?",
      answer: "Sim! Você escolhe o plano de interesse no pré-cadastro para reservar sua preferência. A confirmação final acontece quando liberarmos o cronograma.",
    },
    {
      question: "Como funciona a exclusividade por segmento?",
      answer: "Empresas do mesmo segmento não serão exibidas no mesmo loop. Por exemplo: se houver uma pizzaria, não exibiremos outra pizzaria no mesmo espaço.",
    },
    {
      question: "Posso indicar empresas e ganhar comissão?",
      answer: "Sim! Temos programa de indicação via consultores parceiros. Entre em contato pelo WhatsApp para saber mais sobre as comissões.",
    },
    {
      question: "O plano mensal tem contrato?",
      answer: "Sim, todos os planos têm contrato de 12 meses, inclusive a opção de pagamento mensal. Isso garante sua vaga e a exclusividade no segmento.",
    },
    {
      question: "O Premium pode ter entrada + parcelamento?",
      answer: "Sim! O Plano Premium oferece condição especial de 50% de entrada + 8x no cartão. Consulte outras condições comerciais disponíveis.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="faq-header text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Perguntas{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Frequentes
            </span>
          </h2>
          <p className="text-gray-400">
            Tire suas dúvidas sobre o projeto
          </p>
        </div>

        {/* FAQ List */}
        <div className="faq-list space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item rounded-xl bg-gray-900/50 border border-gray-800/50 overflow-hidden transition-all duration-300 hover:border-gray-700/50"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-white font-medium pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-amber-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-48" : "max-h-0"
                }`}
              >
                <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA para mais dúvidas */}
        <div className="mt-10 text-center">
          <p className="text-gray-500 mb-4">Ainda tem dúvidas?</p>
          <a
            href="https://wa.me/5531999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Falar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
