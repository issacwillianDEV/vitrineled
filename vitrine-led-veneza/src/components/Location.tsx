"use client";

import { useScrollReveal } from "@/lib/animations";
import { bannerRodoviaImage } from "@/lib/siteAssets";

export default function Location() {
    const contentRef = useScrollReveal();

    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            {/* Parallax Background */}
            <div
                className="absolute inset-0 parallax-bg opacity-30"
                data-parallax-layer
                data-depth="0.12"
                style={{
                    backgroundImage: `url(${bannerRodoviaImage.src})`,
                }}
            />
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(900px 520px at 12% 18%, rgba(30, 79, 163, 0.16), transparent 68%), radial-gradient(700px 460px at 84% 78%, rgba(255, 122, 26, 0.12), transparent 70%), rgba(2, 4, 9, 0.8)",
                }}
            />

            <div className="section-shell relative z-10 max-w-[min(96vw,104rem)]" data-immersive-content>
                <div ref={contentRef} className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left — Info */}
                    <div>
                        <span className="text-primary text-sm font-semibold tracking-widest uppercase">
                            Localização
                        </span>
                        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mt-4 mb-8">
                            Localização{" "}
                            <span className="gradient-text">estratégica</span>
                        </h2>

                        <div className="space-y-5">
                            {[
                                { label: "BR-040", detail: "Entrada do Veneza (MG)" },
                                { label: "Proximidade", detail: "Próximo à passarela — ponto de alta visibilidade" },
                                { label: "Alto Fluxo", detail: "Milhares de veículos e pedestres todos os dias" },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-4 group"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                                        <svg
                                            className="w-5 h-5 text-primary"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-white">{item.label}</div>
                                        <div className="text-text-secondary text-sm">{item.detail}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — Highlight Card */}
                    <div className="glass-card rounded-3xl p-8 md:p-10 text-center">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                            <svg
                                className="w-10 h-10 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                                />
                            </svg>
                        </div>
                        <p className="font-display text-xl md:text-2xl font-semibold text-white leading-relaxed mb-4">
                            &ldquo;Principal ponto de atenção visual de quem entra e sai do Veneza.&rdquo;
                        </p>
                        <p className="text-text-muted text-sm">
                            Na Vitrine do Bairro
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
