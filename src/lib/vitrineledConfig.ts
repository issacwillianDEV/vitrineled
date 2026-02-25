export const FIRESTORE_COLLECTIONS = {
    preCadastros: "vitrineled_pre_cadastros",
    login: "vitrineled_login",
} as const;

export const ADMIN_LOGIN_DOC_ID = "OzSy8iwaFRSFhNYQzmec";
export const ADMIN_SESSION_KEY = "vitrineled_admin_session";
export const CADASTRO_STATUS = ["novo", "contatado", "fechado", "cancelado"] as const;

export const PRE_CADASTRO_PLANOS = [
    {
        value: "essencial",
        label: "Visibilidade Essencial",
        duration: "15s",
        exhibitions: "~200/dia",
        badge: null,
        shortFeatures: [
            "1 arte estática ou vídeo",
            "Presença diária garantida",
        ],
    },
    {
        value: "destaque",
        label: "Destaque Estratégico",
        duration: "15–20s",
        exhibitions: "~300/dia",
        badge: null,
        shortFeatures: [
            "Até 2 artes ou vídeos",
            "Possibilidade de troca no mês",
        ],
    },
    {
        value: "premium",
        label: "Impacto Premium",
        duration: "30s",
        exhibitions: "~440/dia",
        badge: "Recomendado",
        shortFeatures: [
            "Vídeo profissional",
            "Exclusividade por segmento",
        ],
    },
    {
        value: "prime",
        label: "Núcleo Prime LED",
        duration: "30s+",
        exhibitions: "Máxima",
        badge: "Exclusivo",
        shortFeatures: [
            "Kit Business mensal completo",
            "Prioridade absoluta na grade",
        ],
    },
] as const;

export type PreCadastroPlanoValue = (typeof PRE_CADASTRO_PLANOS)[number]["value"];

export const PRE_CADASTRO_INVESTIMENTOS: Record<
    PreCadastroPlanoValue,
    { value: string; label: string; promo?: boolean }[]
> = {
    essencial: [
        { value: "essencial_padrao", label: "R$ 1.500,00/mês" },
        { value: "essencial_promocao", label: "R$ 1.200,00/mês", promo: true },
    ],
    destaque: [
        { value: "destaque_padrao", label: "R$ 1.700,00/mês" },
        { value: "destaque_promocao", label: "R$ 1.490,00/mês", promo: true },
    ],
    premium: [
        { value: "premium_personalizado", label: "Proposta personalizada" },
    ],
    prime: [
        { value: "prime_50_8x", label: "50% entrada + 8× no cartão" },
    ],
};
