"use client";

import { useScrollReveal } from "@/lib/animations";
import { motion } from "framer-motion";

const segments = [
    { name: "Comércio local", icon: "🏪" },
    { name: "Clínicas & Laboratórios", icon: "🏥" },
    { name: "Farmácias", icon: "💊" },
    { name: "Escolas & Cursos", icon: "🎓" },
    { name: "Restaurantes", icon: "🍽️" },
    { name: "Supermercados", icon: "🛒" },
    { name: "Serviços", icon: "🔧" },
    { name: "Redes & Grandes Marcas", icon: "🏢" },
];

export default function ForWho() {
    const sectionRef = useScrollReveal();

    return (
        <section className="py-24 md:py-32 bg-dark-card">
            <div
                className="section-shell max-w-[min(96vw,104rem)]"
                data-immersive-content
                ref={sectionRef}
            >
                <div className="text-center mb-16">
                    <span className="text-primary text-sm font-semibold tracking-widest uppercase">
                        Segmentos
                    </span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mt-4 mb-4">
                        Para quem é a{" "}
                        <span className="gradient-text">Vitrine LED</span>?
                    </h2>
                    <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                        Negócios que querem ser vistos, lembrados e escolhidos pelo público local.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {segments.map((seg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05, duration: 0.4 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, y: -4 }}
                            className="glass-card rounded-2xl p-5 text-center cursor-default group hover:bg-white/[0.06] transition-colors duration-500"
                        >
                            <span className="text-3xl mb-3 block">{seg.icon}</span>
                            <span className="text-sm font-medium text-text-secondary group-hover:text-white transition-colors">
                                {seg.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
