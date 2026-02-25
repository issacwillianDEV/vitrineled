export const FIRESTORE_COLLECTIONS = {
    preCadastros: "vitrineled_pre_cadastros",
} as const;

export const PRE_CADASTRO_PLANOS = [
    { value: "essencial", label: "Visibilidade Essencial" },
    { value: "destaque", label: "Destaque Estratégico" },
    { value: "premium", label: "Impacto Premium" },
    { value: "prime", label: "Núcleo Prime LED" },
] as const;

export type PreCadastroPlanoValue = (typeof PRE_CADASTRO_PLANOS)[number]["value"];

export const PRE_CADASTRO_INVESTIMENTOS: Record<
    PreCadastroPlanoValue,
    { value: string; label: string }[]
> = {
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
