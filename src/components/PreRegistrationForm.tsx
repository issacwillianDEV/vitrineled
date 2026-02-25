"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
    FIRESTORE_COLLECTIONS,
    PRE_CADASTRO_INVESTIMENTOS,
    PRE_CADASTRO_PLANOS,
} from "@/lib/vitrineledConfig";

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

/* ─── Plan Card Sub-component ─── */
function PlanCard({
    plan,
    selected,
    onSelect,
    hasError,
}: {
    plan: (typeof PRE_CADASTRO_PLANOS)[number];
    selected: boolean;
    onSelect: () => void;
    hasError: boolean;
}) {
    return (
        <motion.button
            type="button"
            onClick={onSelect}
            whileTap={{ scale: 0.97 }}
            className={`relative text-left w-full rounded-2xl p-4 md:p-5 transition-all duration-300 cursor-pointer group
                ${selected
                    ? "bg-primary/10 border-2 border-primary shadow-[0_0_24px_rgba(30,79,163,0.22)]"
                    : hasError
                        ? "bg-dark-surface/60 border-2 border-red-500/60 hover:border-primary/40"
                        : "bg-dark-surface/60 border border-dark-border hover:border-primary/40 hover:bg-primary/5"
                }`}
        >
            {/* Badge */}
            {plan.badge && (
                <span className="absolute -top-2.5 right-4 inline-flex items-center gap-1 bg-accent/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    {plan.badge}
                </span>
            )}

            {/* Selection indicator */}
            <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
                ${selected ? "border-primary bg-primary" : "border-dark-border group-hover:border-primary/50"}`}>
                {selected && (
                    <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </motion.svg>
                )}
            </div>

            {/* Plan name */}
            <h4 className={`font-display font-bold text-sm md:text-base mb-3 pr-7 ${selected ? "text-white" : "text-text-secondary group-hover:text-white"} transition-colors`}>
                {plan.label}
            </h4>

            {/* Specs row */}
            <div className="flex items-center gap-3 mb-3">
                <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-1 rounded-lg ${selected ? "bg-primary/20 text-primary-light" : "bg-dark-card text-text-muted"}`}>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {plan.duration}
                </span>
                <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-1 rounded-lg ${selected ? "bg-primary/20 text-primary-light" : "bg-dark-card text-text-muted"}`}>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {plan.exhibitions}
                </span>
            </div>

            {/* Features */}
            <ul className="space-y-1.5">
                {plan.shortFeatures.map((feat, j) => (
                    <li key={j} className="flex items-center gap-2">
                        <svg className={`w-3.5 h-3.5 flex-shrink-0 ${selected ? "text-primary" : "text-text-muted"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        <span className="text-text-secondary text-xs">{feat}</span>
                    </li>
                ))}
            </ul>
        </motion.button>
    );
}

/* ─── Investment Radio Card Sub-component ─── */
function InvestmentCard({
    option,
    selected,
    onSelect,
    hasError,
}: {
    option: { value: string; label: string; promo?: boolean };
    selected: boolean;
    onSelect: () => void;
    hasError: boolean;
}) {
    return (
        <motion.button
            type="button"
            onClick={onSelect}
            whileTap={{ scale: 0.97 }}
            className={`relative text-left w-full rounded-xl px-4 py-3 transition-all duration-300 cursor-pointer flex items-center gap-3 group
                ${selected
                    ? "bg-primary/10 border-2 border-primary"
                    : hasError
                        ? "bg-dark-surface/60 border-2 border-red-500/60 hover:border-primary/40"
                        : "bg-dark-surface/60 border border-dark-border hover:border-primary/40 hover:bg-primary/5"
                }`}
        >
            {/* Radio indicator */}
            <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200
                ${selected ? "border-primary" : "border-dark-border group-hover:border-primary/50"}`}>
                {selected && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2.5 h-2.5 rounded-full bg-primary"
                    />
                )}
            </div>

            {/* Label */}
            <span className={`font-semibold text-sm ${selected ? "text-white" : "text-text-secondary"}`}>
                {option.label}
            </span>

            {/* Promo badge */}
            {option.promo && (
                <span className="ml-auto inline-flex items-center gap-1 bg-success/10 text-success text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                    </svg>
                    Promoção
                </span>
            )}
        </motion.button>
    );
}

/* ─── Main Form ─── */
export default function PreRegistrationForm() {
    const [form, setForm] = useState<FormState>(initialForm);
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const investimentoOptions = form.plano
        ? PRE_CADASTRO_INVESTIMENTOS[
        form.plano as keyof typeof PRE_CADASTRO_INVESTIMENTOS
        ] ?? []
        : [];

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setSubmitError(null);
        setSubmitting(true);

        const planoSelecionado = PRE_CADASTRO_PLANOS.find((p) => p.value === form.plano);
        const investimentoSelecionado = investimentoOptions.find(
            (opt) => opt.value === form.investimento
        );

        try {
            await addDoc(collection(db, FIRESTORE_COLLECTIONS.preCadastros), {
                empresa: form.empresa.trim(),
                responsavel: form.responsavel.trim(),
                whatsapp: form.whatsapp.trim(),
                email: form.email.trim().toLowerCase(),
                segmento: form.segmento,
                plano: form.plano,
                planoLabel: planoSelecionado?.label ?? "",
                investimento: form.investimento,
                investimentoLabel: investimentoSelecionado?.label ?? "",
                observacoes: form.observacoes.trim(),
                indicacao: form.indicacao.trim(),
                status: "novo",
                origem: "landing_page",
                createdAt: serverTimestamp(),
                createdAtISO: new Date().toISOString(),
            });

            setSubmitting(false);
            setSubmitted(true);
        } catch (error) {
            console.error("Erro ao salvar pre-cadastro no Firebase:", error);
            setSubmitting(false);
            setSubmitError("Não foi possível enviar agora. Tente novamente em instantes.");
        }
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
                <div className="sm:col-span-2">
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

                {/* ═══ Plano — visual cards ═══ */}
                <div className="sm:col-span-2">
                    <label className="text-text-secondary text-sm font-medium mb-3 block">
                        Escolha seu plano *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {PRE_CADASTRO_PLANOS.map((plan) => (
                            <PlanCard
                                key={plan.value}
                                plan={plan}
                                selected={form.plano === plan.value}
                                onSelect={() => update("plano", plan.value)}
                                hasError={!!errors.plano}
                            />
                        ))}
                    </div>
                    {errors.plano && <p className="text-red-400 text-xs mt-2">{errors.plano}</p>}
                </div>

                {/* ═══ Investimento — radio cards (aparece após selecionar plano) ═══ */}
                <div className="sm:col-span-2">
                    <AnimatePresence>
                        {form.plano && (
                            <motion.div
                                key={form.plano}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <label className="text-text-secondary text-sm font-medium mb-3 block">
                                    Condição de investimento *
                                </label>
                                <div className="space-y-2">
                                    {investimentoOptions.map((opt) => (
                                        <InvestmentCard
                                            key={opt.value}
                                            option={opt}
                                            selected={form.investimento === opt.value}
                                            onSelect={() => update("investimento", opt.value)}
                                            hasError={!!errors.investimento}
                                        />
                                    ))}
                                </div>
                                {errors.investimento && <p className="text-red-400 text-xs mt-2">{errors.investimento}</p>}
                            </motion.div>
                        )}
                    </AnimatePresence>
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

            {submitError && (
                <p className="text-red-400 text-sm mt-6">{submitError}</p>
            )}

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
