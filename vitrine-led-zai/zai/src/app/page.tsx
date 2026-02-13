"use client";

import Hero from "@/components/landing/Hero";
import SectionOQueE from "@/components/landing/SectionOQueE";
import SectionOportunidade from "@/components/landing/SectionOportunidade";
import SectionLocalizacao from "@/components/landing/SectionLocalizacao";
import SectionTecnologia from "@/components/landing/SectionTecnologia";
import SectionPorQueInvestir from "@/components/landing/SectionPorQueInvestir";
import SectionParaQuem from "@/components/landing/SectionParaQuem";
import SectionPlanos from "@/components/landing/SectionPlanos";
import SectionNucleoPrime from "@/components/landing/SectionNucleoPrime";
import SectionRegras from "@/components/landing/SectionRegras";
import SectionFAQ from "@/components/landing/SectionFAQ";
import SectionPreCadastro from "@/components/landing/SectionPreCadastro";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <Hero />
      
      {/* O que é o projeto */}
      <SectionOQueE />
      
      {/* A oportunidade */}
      <SectionOportunidade />
      
      {/* Localização estratégica */}
      <SectionLocalizacao />
      
      {/* Tecnologia LED */}
      <SectionTecnologia />
      
      {/* Por que investir em LED */}
      <SectionPorQueInvestir />
      
      {/* Para quem é */}
      <SectionParaQuem />
      
      {/* Planos */}
      <SectionPlanos />
      
      {/* Núcleo Prime LED */}
      <SectionNucleoPrime />
      
      {/* Regras e Transparência */}
      <SectionRegras />
      
      {/* FAQ */}
      <SectionFAQ />
      
      {/* Pré-cadastro */}
      <SectionPreCadastro />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
