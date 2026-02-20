"use client";

import { useScrollReveal } from "@/lib/animations";
import PreRegistrationForm from "./PreRegistrationForm";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const ctaPhrases = [
    "Traga sua marca para onde os olhos passam.",
    "Faça sua marca aparecer todos os dias.",
    "Comece hoje a ser lembrado amanhã.",
];

export default function FinalCTA() {
    const sectionRef = useScrollReveal();
    const [phraseIdx, setPhraseIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPhraseIdx((prev) => (prev + 1) % ctaPhrases.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

            <div
                className="section-shell relative z-10 max-w-[min(96vw,106rem)]"
                data-immersive-content
                ref={sectionRef}
            >
                <div className="text-center mb-12">
                    <span className="text-primary text-sm font-semibold tracking-widest uppercase">
                        Pré-cadastro
                    </span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mt-4 mb-6">
                        Garanta sua vaga na{" "}
                        <span className="gradient-text">Vitrine LED</span>
                    </h2>

                    {/* Rotating CTA phrase */}
                    <div className="h-8 overflow-hidden">
                        <motion.p
                            key={phraseIdx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-text-secondary text-lg italic"
                        >
                            &ldquo;{ctaPhrases[phraseIdx]}&rdquo;
                        </motion.p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-5 gap-8 items-start">
                    {/* Form — takes 3 cols */}
                    <div className="lg:col-span-3">
                        <PreRegistrationForm />
                    </div>

                    {/* Side info — takes 2 cols */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Meta card */}
                        <div className="glass-card rounded-3xl p-6 md:p-8">
                            <h4 className="font-display font-semibold text-lg text-white mb-6">
                                Meta de validação
                            </h4>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-text-secondary">Total de empresas</span>
                                        <span className="text-primary font-semibold">0/30</span>
                                    </div>
                                    <div className="h-2 bg-dark-surface rounded-full overflow-hidden">
                                        <div className="h-full bg-primary rounded-full shadow-[0_0_14px_rgba(30,79,163,0.45)] transition-all duration-500" style={{ width: "0%" }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-text-secondary">Núcleo Prime LED</span>
                                        <span className="text-primary font-semibold">0/10</span>
                                    </div>
                                    <div className="h-2 bg-dark-surface rounded-full overflow-hidden">
                                        <div className="h-full bg-accent rounded-full shadow-[0_0_14px_rgba(255,122,26,0.45)] transition-all duration-500" style={{ width: "0%" }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* WhatsApp card */}
                        <a
                            href="https://wa.me/5531999999999?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20a%20Vitrine%20LED%20Veneza"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-card rounded-3xl p-6 md:p-8 flex items-center gap-4 group hover:bg-white/[0.06] transition-colors duration-500 block"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                                <svg className="w-7 h-7 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-semibold text-white group-hover:text-primary transition-colors">
                                    Fale pelo WhatsApp
                                </p>
                                <p className="text-text-muted text-sm">Tire suas dúvidas em tempo real</p>
                            </div>
                        </a>

                        {/* Consultor card */}
                        <div className="glass-card rounded-3xl p-6 md:p-8">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-white text-sm">Consultor LED</p>
                                    <p className="text-text-muted text-sm mt-1">
                                        Indique empresas e ganhe benefícios. Preencha o campo &ldquo;Indicação&rdquo; no formulário.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
