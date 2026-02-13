"use client";

import { useScrollReveal } from "@/lib/animations";

const rules = [
    {
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
        ),
        text: "Pré-cadastro agora, sem pagamento.",
    },
    {
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
            </svg>
        ),
        text: "Ao atingir 30 empresas, será liberado o cronograma de implantação e início da validação contratual.",
    },
    {
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
        ),
        text: "Todos os planos terão contrato de 12 meses, inclusive opções com pagamento mensal.",
    },
    {
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
        ),
        text: "Vagas limitadas por segmento — garanta sua posição antes da concorrência.",
    },
];

export default function Transparency() {
    const sectionRef = useScrollReveal();

    return (
        <section className="py-24 md:py-32">
            <div className="max-w-4xl mx-auto px-4 sm:px-6" ref={sectionRef}>
                <div className="text-center mb-12">
                    <span className="text-primary text-sm font-semibold tracking-widest uppercase">
                        Transparência
                    </span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mt-4 mb-4">
                        Regras claras,{" "}
                        <span className="gradient-text">sem surpresas</span>
                    </h2>
                </div>

                <div className="glass-card rounded-3xl p-8 md:p-10 space-y-6">
                    {rules.map((rule, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                                {rule.icon}
                            </div>
                            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                                {rule.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
