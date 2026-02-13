"use client";

import { useScrollReveal } from "@/lib/animations";

const primeFeatures = [
    "4 flyers profissionais por mês",
    "1 vídeo profissional por mês",
    "Prioridade em horários estratégicos",
    "Loop diferenciado — mais exibições diárias",
    "Identificação como membro Prime",
    "Exclusividade por segmento garantida",
    "Condição especial: 50% entrada + 8× no cartão",
];

export default function PrimeLed() {
    const sectionRef = useScrollReveal();

    const scrollToForm = () => {
        const el = document.querySelector("#contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="py-24 md:py-32 bg-dark-card relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div
                className="section-shell relative z-10 max-w-[min(96vw,90rem)]"
                data-immersive-content
                ref={sectionRef}
            >
                <div className="text-center mb-12">
                    <span className="text-primary text-sm font-semibold tracking-widest uppercase">
                        Exclusivo
                    </span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mt-4 mb-4">
                        Núcleo{" "}
                        <span className="gradient-text">Prime LED</span>
                    </h2>
                    <p className="text-text-secondary text-lg max-w-xl mx-auto">
                        O grupo premium de empresas com máxima visibilidade, conteúdo profissional e prioridade absoluta.
                    </p>
                </div>

                {/* Prime Card */}
                <div className="plan-card-featured pulse-glow">
                    <div className="p-8 md:p-12">
                        <div className="flex flex-col md:flex-row md:items-start gap-8">
                            {/* Left */}
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-6">
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>
                                    Vagas limitadas por segmento
                                </div>

                                <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-2">
                                    Kit Business Mensal
                                </h3>
                                <p className="text-text-secondary mb-8">
                                    Tudo que sua marca precisa para dominar a vitrine.
                                </p>

                                <ul className="space-y-4">
                                    {primeFeatures.map((feat, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                </svg>
                                            </div>
                                            <span className="text-white text-sm md:text-base">{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Right — CTA */}
                            <div className="md:w-72 flex flex-col items-center md:items-start md:pt-8">
                                <div className="glass-card rounded-2xl p-6 text-center w-full mb-6">
                                    <p className="text-text-muted text-sm mb-2">Meta de vagas</p>
                                    <div className="font-display font-bold text-4xl gradient-text mb-1">10</div>
                                    <p className="text-text-muted text-xs">empresas no Núcleo Prime</p>
                                </div>
                                <button
                                    onClick={scrollToForm}
                                    className="btn-glow w-full text-center"
                                >
                                    Quero ser Prime
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
