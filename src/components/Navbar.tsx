"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { logoBrancoImage } from "@/lib/siteAssets";

const navLinks = [
    { label: "O Projeto", href: "#about" },
    { label: "Planos", href: "#plans" },
    { label: "FAQ", href: "#faq" },
    { label: "Contato", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (href: string) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "navbar-blur border-b border-white/5" : "bg-transparent"
                    }`}
            >
                <div className="section-shell max-w-[min(96vw,118rem)]">
                    <div className="flex items-center justify-between h-20 md:h-24">
                        {/* Logo */}
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="flex items-center group relative w-[clamp(7.5rem,14vw,9.5rem)] h-14"
                        >
                            <Image
                                src={logoBrancoImage}
                                alt="Logo Vitrine LED Veneza"
                                fill
                                quality={100}
                                sizes="(max-width: 768px) 120px, 160px"
                                className="object-contain object-left scale-125 md:scale-150 origin-left transition-transform duration-300"
                                priority
                            />
                        </button>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <button
                                    key={link.href}
                                    onClick={() => scrollTo(link.href)}
                                    className="text-sm text-text-secondary hover:text-white transition-colors duration-300"
                                >
                                    {link.label}
                                </button>
                            ))}
                            <button
                                onClick={() => scrollTo("#contact")}
                                className="btn-glow !py-2.5 !px-6 text-sm"
                            >
                                Pré-cadastrar
                            </button>
                        </div>

                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
                            aria-label="Menu"
                        >
                            <motion.span
                                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                                className="block w-6 h-0.5 bg-white origin-center"
                            />
                            <motion.span
                                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="block w-6 h-0.5 bg-white"
                            />
                            <motion.span
                                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                                className="block w-6 h-0.5 bg-white origin-center"
                            />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-dark/95 backdrop-blur-xl pt-24 px-6"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link, i) => (
                                <motion.button
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => scrollTo(link.href)}
                                    className="text-2xl font-display font-semibold text-white text-left"
                                >
                                    {link.label}
                                </motion.button>
                            ))}
                            <motion.button
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                onClick={() => scrollTo("#contact")}
                                className="btn-glow text-center mt-4"
                            >
                                Pré-cadastrar Minha Empresa
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
