"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const segmentos = [
    "Comércio local",
    "Clínica / Laboratório",
    "Farmácia",
    "Escola / Curso",
    "Restaurante / Lanchonete",
    "Supermercado / Mercado",
    "Serviços em geral",
    "Rede / Grande marca",
    "Outro",
];

const planos = [
    { value: "essencial", label: "Visibilidade Essencial" },
    { value: "destaque", label: "Destaque Estratégico" },
    { value: "premium", label: "Impacto Premium" },
    { value: "prime", label: "Núcleo Prime LED" },
];

const investimentoPorPlano: Record<string, { value: string; label: string }[]> = {
    essencial: [
        { value: "essencial_padrao", label: "Valor padrão: R$ 1.500,00/mês" },
        { value: "essencial_promocao", label: "Promoção de inauguração: R$ 1.200,00/mês" },
    ],
    destaque: [
        { value: "destaque_padrao", label: "Valor padrão: R$ 1.700,00/mês" },
        { value: "destaque_promocao", label: "Promoção de inauguração: R$ 1.490,00/mês" },
    ],
    premium: [
        { value: "premium_personalizado", label: "Plano Impacto Premium: proposta personalizada" },
    ],
    prime: [
        { value: "prime_50_8x", label: "Núcleo Prime: 50% de entrada + 8x no cartão vinculado" },
    ],
};

interface FormState {
    empresa: string;
    responsavel: string;
    whatsapp: string;
    email: string;
    segmento: string;
    plano: string;
    investimento: string;
    observacoes: string;
    indicacao: string;
    lgpd: boolean;
}

const initialForm: FormState = {
    empresa: "",
    responsavel: "",
    whatsapp: "",
    email: "",
    segmento: "",
    plano: "",
    investimento: "",
    observacoes: "",
    indicacao: "",
    lgpd: false,
};

export default function PreRegistrationForm() {
    const [form, setForm] = useState<FormState>(initialForm);
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const investimentoOptions = form.plano ? investimentoPorPlano[form.plano] ?? [] : [];

    const update = (field: keyof FormState, value: string | boolean) => {
        setForm((prev) => {
            if (field === "plano") {
                return {
                    ...prev,
                    plano: value as string,
                    investimento: "",
                };
            }
            return { ...prev, [field]: value };
        });
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
        if (field === "plano" && errors.investimento) {
            setErrors((prev) => ({ ...prev, investimento: undefined }));
        }
    };

    const formatPhone = (v: string) => {
        const nums = v.replace(/\D/g, "").slice(0, 11);
        if (nums.length <= 2) return `(${nums}`;
        if (nums.length <= 7) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
        return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`;
    };

    const validate = (): boolean => {
        const errs: Partial<Record<keyof FormState, string>> = {};
        if (!form.empresa.trim()) errs.empresa = "Informe o nome da empresa";
        if (!form.responsavel.trim()) errs.responsavel = "Informe o responsável";
        if (!form.whatsapp.replace(/\D/g, "") || form.whatsapp.replace(/\D/g, "").length < 10)
            errs.whatsapp = "Informe um WhatsApp válido";
        if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
            errs.email = "Informe um e-mail válido";
        if (!form.segmento) errs.segmento = "Selecione o segmento";
        if (!form.plano) errs.plano = "Selecione o plano de interesse";
        if (!form.investimento) errs.investimento = "Selecione a condição de investimento";
        if (!form.lgpd) errs.lgpd = "Aceite os termos para continuar";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setSubmitting(true);
        // Simula envio (fase 1 — sem backend)
        setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);
        }, 1500);
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-lg mx-auto"
            >
                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="font-display font-bold text-2xl text-white mb-3">
                    Pré-cadastro realizado!
                </h3>
                <p className="text-text-secondary leading-relaxed mb-6">
                    Sua empresa foi registrada com sucesso. Entraremos em contato pelo WhatsApp para confirmar os detalhes e informar os próximos passos assim que a meta de 30 empresas for atingida.
                </p>
                <div className="glass-card rounded-2xl p-5 text-left space-y-2">
                    <p className="text-sm text-text-muted font-semibold uppercase tracking-wider mb-3">Próximos passos:</p>
                    <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">1</span>
                        <p className="text-text-secondary text-sm">Confirmação via WhatsApp em até 24h</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">2</span>
                        <p className="text-text-secondary text-sm">Ao atingir 30 empresas → cronograma oficial</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">3</span>
                        <p className="text-text-secondary text-sm">Validação contratual e início da implantação</p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setForm(initialForm);
                        setSubmitted(false);
                    }}
                    className="mt-6 text-primary text-sm font-medium hover:underline"
                >
                    Cadastrar outra empresa
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 md:p-10 max-w-2xl mx-auto">
            <h3 className="font-display font-bold text-2xl text-white mb-2">
                Pré-cadastro
            </h3>
            <p className="text-text-muted text-sm mb-8">
                Sem pagamento. Preencha e garanta sua vaga.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
                {/* Empresa */}
                <div className="sm:col-span-2">
                    <label className="text-text-secondary text-sm font-medium mb-1.5 block">Nome da empresa *</label>
                    <input
                        type="text"
                        className={`form-input ${errors.empresa ? "!border-red-500" : ""}`}
                        placeholder="Ex: Padaria Veneza"
                        value={form.empresa}
                        onChange={(e) => update("empresa", e.target.value)}
                    />
                    {errors.empresa && <p className="text-red-400 text-xs mt-1">{errors.empresa}</p>}
                </div>

                {/* Responsável */}
                <div>
                    <label className="text-text-secondary text-sm font-medium mb-1.5 block">Responsável *</label>
                    <input
                        type="text"
                        className={`form-input ${errors.responsavel ? "!border-red-500" : ""}`}
                        placeholder="Seu nome"
                        value={form.responsavel}
                        onChange={(e) => update("responsavel", e.target.value)}
                    />
                    {errors.responsavel && <p className="text-red-400 text-xs mt-1">{errors.responsavel}</p>}
                </div>

                {/* WhatsApp */}
                <div>
                    <label className="text-text-secondary text-sm font-medium mb-1.5 block">WhatsApp *</label>
                    <input
                        type="tel"
                        className={`form-input ${errors.whatsapp ? "!border-red-500" : ""}`}
                        placeholder="(31) 99999-9999"
                        value={form.whatsapp}
                        onChange={(e) => update("whatsapp", formatPhone(e.target.value))}
                    />
                    {errors.whatsapp && <p className="text-red-400 text-xs mt-1">{errors.whatsapp}</p>}
                </div>

                {/* E-mail */}
                <div className="sm:col-span-2">
                    <label className="text-text-secondary text-sm font-medium mb-1.5 block">E-mail *</label>
                    <input
                        type="email"
                        className={`form-input ${errors.email ? "!border-red-500" : ""}`}
                        placeholder="contato@empresa.com"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Segmento */}
                <div>
                    <label className="text-text-secondary text-sm font-medium mb-1.5 block">Segmento *</label>
                    <select
                        className={`form-input ${errors.segmento ? "!border-red-500" : ""} ${!form.segmento ? "text-text-muted" : ""
                            }`}
                        value={form.segmento}
                        onChange={(e) => update("segmento", e.target.value)}
                    >
                        <option value="">Selecione...</option>
                        {segmentos.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    {errors.segmento && <p className="text-red-400 text-xs mt-1">{errors.segmento}</p>}
                </div>

                {/* Plano */}
                <div>
                    <label className="text-text-secondary text-sm font-medium mb-1.5 block">Plano de interesse *</label>
                    <select
                        className={`form-input ${errors.plano ? "!border-red-500" : ""} ${!form.plano ? "text-text-muted" : ""
                            }`}
                        value={form.plano}
                        onChange={(e) => update("plano", e.target.value)}
                    >
                        <option value="">Selecione...</option>
                        {planos.map((p) => (
                            <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                    </select>
                    {errors.plano && <p className="text-red-400 text-xs mt-1">{errors.plano}</p>}
                </div>

                {/* Investimento */}
                <div className="sm:col-span-2">
                    <label className="text-text-secondary text-sm font-medium mb-1.5 block">Investimento *</label>
                    <select
                        className={`form-input ${errors.investimento ? "!border-red-500" : ""} ${!form.investimento ? "text-text-muted" : ""}`}
                        value={form.investimento}
                        onChange={(e) => update("investimento", e.target.value)}
                        disabled={!form.plano}
                    >
                        <option value="">{form.plano ? "Selecione a condição..." : "Selecione um plano antes..."}</option>
                        {investimentoOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                    {errors.investimento && <p className="text-red-400 text-xs mt-1">{errors.investimento}</p>}
                </div>

                {/* Observações */}
                <div className="sm:col-span-2">
                    <label className="text-text-secondary text-sm font-medium mb-1.5 block">Observações</label>
                    <textarea
                        className="form-input resize-none"
                        rows={3}
                        placeholder="Algo que queira nos contar (opcional)"
                        value={form.observacoes}
                        onChange={(e) => update("observacoes", e.target.value)}
                    />
                </div>

                {/* Indicação */}
                <div className="sm:col-span-2">
                    <label className="text-text-secondary text-sm font-medium mb-1.5 block">Indicação / Consultor</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Quem indicou você? (opcional)"
                        value={form.indicacao}
                        onChange={(e) => update("indicacao", e.target.value)}
                    />
                </div>

                {/* LGPD */}
                <div className="sm:col-span-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={form.lgpd}
                            onChange={(e) => update("lgpd", e.target.checked)}
                            className="mt-1 w-4 h-4 rounded border-dark-border bg-dark-surface text-primary focus:ring-primary/30 accent-primary"
                        />
                        <span className={`text-sm leading-relaxed ${errors.lgpd ? "text-red-400" : "text-text-muted"} group-hover:text-text-secondary transition-colors`}>
                            Autorizo o contato por WhatsApp e e-mail para informações sobre o projeto Vitrine LED Veneza, conforme a LGPD. *
                        </span>
                    </label>
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={submitting}
                className="btn-glow w-full mt-8 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {submitting ? (
                    <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Enviando...
                    </>
                ) : (
                    "Pré-cadastrar minha empresa"
                )}
            </button>
        </form>
    );
}
