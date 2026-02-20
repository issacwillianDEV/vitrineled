"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/lib/animations";

const faqs = [
    {
        q: "Vou pagar agora?",
        a: "Não. O pré-cadastro é totalmente gratuito e sem compromisso de pagamento. Você está apenas reservando seu interesse e garantindo sua vaga.",
    },
    {
        q: "Quando começa?",
        a: "Após atingir a meta de 30 empresas pré-cadastradas, anunciaremos o cronograma oficial de implantação e início da validação contratual.",
    },
    {
        q: "Posso escolher meu plano agora?",
        a: "Sim! Ao pré-cadastrar, você escolhe o plano de interesse para reservar sua posição. A formalização será feita na etapa contratual.",
    },
    {
        q: "Como funciona a exclusividade por segmento?",
        a: "Nos planos Premium e Prime, garantimos que apenas uma empresa de cada segmento ocupe a posição exclusiva. Reservar primeiro é fundamental.",
    },
    {
        q: "Posso indicar empresas e ganhar comissão?",
        a: "Sim! Temos um canal de indicação via Consultor LED. Quem indica empresas que se cadastram pode receber benefícios ou comissão.",
    },
    {
        q: "O plano mensal tem contrato?",
        a: "Sim. Todos os planos terão contrato de 12 meses, inclusive as opções com pagamento mensal.",
    },
    {
        q: "O Premium pode ter entrada + parcelamento?",
        a: "Sim! O plano Premium oferece condição especial de 50% de entrada + 8 parcelas no cartão, conforme condição comercial aprovada.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const sectionRef = useScrollReveal();

    return (
        <section id="faq" className="py-24 md:py-32 bg-dark-card">
            <div
                className="section-shell max-w-[min(96vw,78rem)]"
                data-immersive-content
                ref={sectionRef}
            >
                <div className="text-center mb-12">
                    <span className="text-primary text-sm font-semibold tracking-widest uppercase">
                        Dúvidas
                    </span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mt-4 mb-4">
                        Perguntas{" "}
                        <span className="gradient-text">frequentes</span>
                    </h2>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="glass-card rounded-2xl overflow-hidden transition-colors duration-300 hover:bg-white/[0.04]"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
                            >
                                <span className="font-semibold text-white text-base md:text-lg">
                                    {faq.q}
                                </span>
                                <motion.svg
                                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-5 h-5 text-primary flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </motion.svg>
                            </button>

                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-5 md:px-6 pb-5 md:pb-6 text-text-secondary leading-relaxed">
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
