"use client";

import { useStaggerReveal } from "@/lib/animations";
import { fluxoTrafegoImage } from "@/lib/siteAssets";

const opportunities = [
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        title: "Lembrança de Marca",
        description:
            "Sua marca vista repetidamente no trajeto diário cria uma conexão automática na memória do consumidor.",
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
        ),
        title: "Tráfego para o Ponto de Venda",
        description:
            "Cada exibição é um convite visual para o cliente ir até o seu estabelecimento. Presença gera movimento.",
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
        ),
        title: "Autoridade e Posicionamento",
        description:
            "Estar na Vitrine LED posiciona sua marca como referência profissional no bairro. Quem aparece, é lembrado.",
    },
];

export default function Opportunity() {
    const gridRef = useStaggerReveal();

    return (
        <section className="relative py-24 md:py-32 bg-dark-card overflow-hidden">
            <div
                className="absolute inset-0 opacity-20 bg-cover bg-center"
                data-parallax-layer
                data-depth="0.08"
                style={{ backgroundImage: `url(${fluxoTrafegoImage.src})` }}
            />
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(3, 6, 13, 0.85), rgba(3, 6, 13, 0.92))",
                }}
            />
            <div className="section-shell relative z-10 max-w-[min(96vw,104rem)]" data-immersive-content>
                <div className="text-center mb-16">
                    <span className="text-primary text-sm font-semibold tracking-widest uppercase">
                        Oportunidade
                    </span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mt-4 mb-4">
                        A oportunidade que{" "}
                        <span className="gradient-text">muda o jogo</span>
                    </h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        Três pilares que transformam visibilidade em resultado real para o seu negócio.
                    </p>
                </div>

                <div ref={gridRef} className="grid md:grid-cols-3 gap-6 md:gap-8">
                    {opportunities.map((item, i) => (
                        <div
                            key={i}
                            className="glass-card rounded-2xl p-8 text-center group hover:bg-white/[0.06] transition-all duration-500"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary group-hover:bg-primary/20 transition-colors duration-500">
                                {item.icon}
                            </div>
                            <h3 className="font-display font-semibold text-xl text-white mb-3">
                                {item.title}
                            </h3>
                            <p className="text-text-secondary leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
