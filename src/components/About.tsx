"use client";

import { useScrollReveal } from "@/lib/animations";

export default function About() {
    const sectionRef = useScrollReveal();

    return (
        <section id="about" className="relative py-24 md:py-32 overflow-hidden">
            <div
                className="section-shell max-w-[min(96vw,88rem)] text-center"
                data-immersive-content
                ref={sectionRef}
            >
                {/* Decorative line */}
                <div className="w-12 h-1 bg-primary rounded-full mx-auto mb-8 shadow-[0_0_16px_rgba(30,79,163,0.42)]" />

                <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-8 leading-tight">
                    Transforme o fluxo em{" "}
                    <span className="gradient-text">atenção</span>, a atenção em{" "}
                    <span className="gradient-text">lembrança</span> e a lembrança em{" "}
                    <span className="gradient-text">vendas</span>.
                </h2>

                <p className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                    A Vitrine LED Veneza é mais do que um painel — é o ponto de presença diária
                    da sua marca no trajeto de milhares de pessoas. Todos os dias, a mesma
                    audiência vê, reconhece e lembra do seu negócio.
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16 max-w-2xl mx-auto">
                    <div className="text-center">
                        <div className="font-display font-bold text-3xl md:text-4xl gradient-text mb-1">5m×3m</div>
                        <div className="text-text-muted text-sm">Painel LED</div>
                    </div>
                    <div className="text-center">
                        <div className="font-display font-bold text-3xl md:text-4xl gradient-text mb-1">P5</div>
                        <div className="text-text-muted text-sm">Alta Definição</div>
                    </div>
                    <div className="text-center">
                        <div className="font-display font-bold text-3xl md:text-4xl gradient-text mb-1">24h</div>
                        <div className="text-text-muted text-sm">Visibilidade</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
