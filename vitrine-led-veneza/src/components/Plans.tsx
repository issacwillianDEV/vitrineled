"use client";

import { useStaggerReveal } from "@/lib/animations";

const plans = [
    {
        name: "Visibilidade Essencial",
        badge: null,
        featured: false,
        duration: "15s",
        exhibitions: "~200 exibições/dia",
        loop: "Loop compartilhado",
        features: [
            "1 arte estática ou vídeo simples",
            "Vigência de 30 dias",
            "Presença diária garantida",
            "Suporte de implantação",
        ],
        cta: "Quero este plano",
    },
    {
        name: "Destaque Estratégico",
        badge: null,
        featured: false,
        duration: "15–20s",
        exhibitions: "~300 exibições/dia",
        loop: "Loop reduzido",
        features: [
            "Até 2 artes ou vídeos",
            "Possibilidade de troca no mês",
            "Vigência de 30 dias",
            "Mais tempo de tela",
        ],
        cta: "Quero este plano",
    },
    {
        name: "Impacto Premium",
        badge: "Recomendado",
        featured: true,
        duration: "30s",
        exhibitions: "~440 exibições/dia",
        loop: "Loop altamente exclusivo",
        features: [
            "Vídeo profissional (motion/filmado)",
            "Exclusividade por segmento",
            "Relatório mensal de exibições",
            "Prioridade na grade de horários",
            "Máximo impacto e retorno",
        ],
        cta: "Quero o Premium",
    },
];

export default function Plans() {
    const gridRef = useStaggerReveal();

    const scrollToForm = () => {
        const el = document.querySelector("#contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section id="plans" className="py-24 md:py-32">
            <div className="section-shell max-w-[min(96vw,104rem)]" data-immersive-content>
                <div className="text-center mb-16">
                    <span className="text-primary text-sm font-semibold tracking-widest uppercase">
                        Planos
                    </span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mt-4 mb-4">
                        Escolha o plano ideal para{" "}
                        <span className="gradient-text">sua marca</span>
                    </h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        Sem pagamento agora — faça seu pré-cadastro e reserve sua vaga.
                    </p>
                </div>

                <div ref={gridRef} className="grid md:grid-cols-3 gap-6 md:gap-8 items-stretch">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className={`${plan.featured ? "plan-card-featured" : "plan-card"} flex flex-col`}
                        >
                            <div className="p-8 flex flex-col h-full">
                                {/* Badge */}
                                {plan.badge && (
                                    <div className="mb-4">
                                        <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                            </svg>
                                            {plan.badge}
                                        </span>
                                    </div>
                                )}

                                {/* Plan Name */}
                                <h3 className="font-display font-bold text-2xl text-white mb-6">
                                    {plan.name}
                                </h3>

                                {/* Specs */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                                            {plan.duration}
                                        </span>
                                        <span className="text-text-secondary text-sm">Duração por exibição</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                            </svg>
                                        </span>
                                        <span className="text-text-secondary text-sm">{plan.exhibitions}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                                            </svg>
                                        </span>
                                        <span className="text-text-secondary text-sm">{plan.loop}</span>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="h-px bg-dark-border mb-6" />

                                {/* Features */}
                                <ul className="space-y-3 mb-8 flex-grow">
                                    {plan.features.map((feat, j) => (
                                        <li key={j} className="flex items-start gap-3">
                                            <svg
                                                className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            <span className="text-text-secondary text-sm">{feat}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <button
                                    onClick={scrollToForm}
                                    className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${plan.featured
                                            ? "btn-glow !rounded-xl"
                                            : "bg-dark-surface border border-dark-border text-white hover:border-primary/40 hover:bg-primary/5"
                                        }`}
                                >
                                    {plan.cta}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-text-muted text-center text-sm mt-8">
                    Todos os planos com contrato de 12 meses. Pré-cadastro sem pagamento.
                </p>
            </div>
        </section>
    );
}
