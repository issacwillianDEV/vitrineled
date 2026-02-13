"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Check, Loader2, User, Building2, Mail, Phone, MessageSquare, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SectionPreCadastro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    empresa: "",
    responsavel: "",
    whatsapp: "",
    email: "",
    segmento: "",
    plano: "",
    observacoes: "",
    indicacao: "",
    consentimento: false,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".form-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".form-header",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".form-container",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".form-container",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animação dos contadores
      gsap.fromTo(
        ".counter-card",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".counters-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consentimento) {
      alert("Por favor, aceite os termos de contato para continuar.");
      return;
    }

    setIsSubmitting(true);

    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset após mostrar sucesso
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        empresa: "",
        responsavel: "",
        whatsapp: "",
        email: "",
        segmento: "",
        plano: "",
        observacoes: "",
        indicacao: "",
        consentimento: false,
      });
    }, 5000);
  };

  const planOptions = [
    { value: "1", label: "Plano 1 - Visibilidade Essencial" },
    { value: "2", label: "Plano 2 - Destaque Estratégico" },
    { value: "3", label: "Plano 3 - Impacto Premium" },
    { value: "prime", label: "Núcleo Prime LED (VIP)" },
  ];

  const segmentOptions = [
    "Comércio Local",
    "Saúde (Clínicas/Farmácias)",
    "Educação (Escolas/Cursos)",
    "Alimentação (Restaurantes/Delivery)",
    "Varejo (Supermercados)",
    "Serviços",
    "Outros",
  ];

  return (
    <section
      ref={sectionRef}
      id="pre-cadastro"
      className="relative py-24 sm:py-32 bg-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contadores de Meta */}
        <div className="counters-grid grid grid-cols-2 gap-4 sm:gap-6 mb-16 max-w-2xl mx-auto">
          <div className="counter-card text-center p-6 rounded-2xl bg-gradient-to-b from-gray-900/80 to-gray-900/40 border border-gray-800/50">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-amber-400" />
              <span className="text-gray-400 text-sm">Meta Geral</span>
            </div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl sm:text-5xl font-bold text-white">0</span>
              <span className="text-2xl text-gray-500">/30</span>
            </div>
            <p className="text-gray-500 text-xs mt-1">empresas pré-cadastradas</p>
            {/* Barra de progresso */}
            <div className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: "0%" }} />
            </div>
          </div>

          <div className="counter-card text-center p-6 rounded-2xl bg-gradient-to-b from-amber-500/10 to-orange-500/5 border border-amber-500/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-5 h-5 text-amber-400" />
              <span className="text-gray-400 text-sm">Núcleo Prime</span>
            </div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl sm:text-5xl font-bold text-amber-400">0</span>
              <span className="text-2xl text-gray-500">/10</span>
            </div>
            <p className="text-gray-500 text-xs mt-1">vagas VIP disponíveis</p>
            {/* Barra de progresso */}
            <div className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: "0%" }} />
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="form-header text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
            Pré-Cadastro
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Reserve sua vaga{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              agora
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Preencha o formulário abaixo para manifestar seu interesse. 
            <span className="text-amber-400 font-medium"> Sem pagamento nesta etapa.</span>
          </p>
        </div>

        {/* Formulário */}
        <div className="form-container max-w-2xl mx-auto">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-gray-900/80 to-gray-900/40 border border-gray-800/50">
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Pré-cadastro enviado!
                </h3>
                <p className="text-gray-400">
                  Entraremos em contato em breve com os próximos passos.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nome da Empresa */}
                  <div className="space-y-2">
                    <Label htmlFor="empresa" className="text-gray-300 text-sm">
                      Nome da Empresa *
                    </Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        id="empresa"
                        required
                        value={formData.empresa}
                        onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                        className="pl-10 bg-gray-900/50 border-gray-700 focus:border-amber-500 text-white"
                        placeholder="Sua empresa"
                      />
                    </div>
                  </div>

                  {/* Responsável */}
                  <div className="space-y-2">
                    <Label htmlFor="responsavel" className="text-gray-300 text-sm">
                      Responsável *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        id="responsavel"
                        required
                        value={formData.responsavel}
                        onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                        className="pl-10 bg-gray-900/50 border-gray-700 focus:border-amber-500 text-white"
                        placeholder="Seu nome"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* WhatsApp */}
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp" className="text-gray-300 text-sm">
                      WhatsApp *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        id="whatsapp"
                        type="tel"
                        required
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="pl-10 bg-gray-900/50 border-gray-700 focus:border-amber-500 text-white"
                        placeholder="(31) 99999-9999"
                      />
                    </div>
                  </div>

                  {/* E-mail */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300 text-sm">
                      E-mail *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10 bg-gray-900/50 border-gray-700 focus:border-amber-500 text-white"
                        placeholder="email@empresa.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Segmento */}
                  <div className="space-y-2">
                    <Label htmlFor="segmento" className="text-gray-300 text-sm">
                      Segmento *
                    </Label>
                    <select
                      id="segmento"
                      required
                      value={formData.segmento}
                      onChange={(e) => setFormData({ ...formData, segmento: e.target.value })}
                      className="w-full h-10 px-3 py-2 rounded-md bg-gray-900/50 border border-gray-700 focus:border-amber-500 text-white text-sm"
                    >
                      <option value="">Selecione...</option>
                      {segmentOptions.map((seg) => (
                        <option key={seg} value={seg}>{seg}</option>
                      ))}
                    </select>
                  </div>

                  {/* Plano de Interesse */}
                  <div className="space-y-2">
                    <Label htmlFor="plano" className="text-gray-300 text-sm">
                      Plano de Interesse *
                    </Label>
                    <select
                      id="plano"
                      required
                      value={formData.plano}
                      onChange={(e) => setFormData({ ...formData, plano: e.target.value })}
                      className="w-full h-10 px-3 py-2 rounded-md bg-gray-900/50 border border-gray-700 focus:border-amber-500 text-white text-sm"
                    >
                      <option value="">Selecione...</option>
                      {planOptions.map((plan) => (
                        <option key={plan.value} value={plan.value}>{plan.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Observações */}
                <div className="space-y-2">
                  <Label htmlFor="observacoes" className="text-gray-300 text-sm">
                    Observações (opcional)
                  </Label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    <Textarea
                      id="observacoes"
                      value={formData.observacoes}
                      onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                      className="pl-10 bg-gray-900/50 border-gray-700 focus:border-amber-500 text-white min-h-[80px] resize-none"
                      placeholder="Informações adicionais..."
                    />
                  </div>
                </div>

                {/* Indicação */}
                <div className="space-y-2">
                  <Label htmlFor="indicacao" className="text-gray-300 text-sm">
                    Indicação/Consultor (opcional)
                  </Label>
                  <Input
                    id="indicacao"
                    value={formData.indicacao}
                    onChange={(e) => setFormData({ ...formData, indicacao: e.target.value })}
                    className="bg-gray-900/50 border-gray-700 focus:border-amber-500 text-white"
                    placeholder="Nome de quem indicou"
                  />
                </div>

                {/* Consentimento LGPD */}
                <div className="flex items-start gap-3 pt-2">
                  <Checkbox
                    id="consentimento"
                    checked={formData.consentimento}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, consentimento: checked as boolean })
                    }
                    className="border-gray-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                  />
                  <Label htmlFor="consentimento" className="text-gray-400 text-sm leading-relaxed">
                    Concordo em ser contatado pela equipe da Innova Mídia Led para receber 
                    informações sobre o projeto Vitrine LED Veneza. (LGPD)
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-black hover:shadow-lg hover:shadow-amber-500/25 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Enviar pré-cadastro
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
