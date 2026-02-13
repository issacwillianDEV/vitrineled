"use client";

import { useScrollReveal } from "@/lib/animations";
import { motion } from "framer-motion";

const benefits = [
    "Impacto visual imediato — sua marca salta aos olhos",
    "Comunicação moderna e dinâmica com vídeo e motion",
    "Repetição gera lembrança — todos os dias, mesmo público",
    "Presença diária no trajeto do cliente ideal",
    "Excelente custo por impacto — sem desperdiçar verba",
];

export default function WhyLed() {
    const sectionRef = useScrollReveal();

    return (
        <section className="py-24 md:py-32">
            <div className="max-w-4xl mx-auto px-4 sm:px-6" ref={sectionRef}>
                <div className="text-center mb-16">
                    <span className="text-primary text-sm font-semibold tracking-widest uppercase">
                        Benefícios
                    </span>
                    <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white mt-4">
                        Por que investir em{" "}
                        <span className="gradient-text">LED</span>?
                    </h2>
                </div>

                <div className="space-y-4">
                    {benefits.map((benefit, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-4 p-4 rounded-xl hover:bg-dark-card transition-colors duration-300 group"
                        >
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                                <svg
                                    className="w-4 h-4 text-primary"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>
                            <p className="text-text-secondary text-lg group-hover:text-white transition-colors duration-300">
                                {benefit}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
