"use client";

import { useEffect, useMemo, useState } from "react";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
    ADMIN_LOGIN_DOC_ID,
    ADMIN_SESSION_KEY,
    CADASTRO_STATUS,
    FIRESTORE_COLLECTIONS,
    PRE_CADASTRO_PLANOS,
} from "@/lib/vitrineledConfig";

type CadastroStatus = (typeof CADASTRO_STATUS)[number];

interface PreCadastroDoc {
    id: string;
    empresa: string;
    responsavel: string;
    whatsapp: string;
    email: string;
    segmento: string;
    plano: string;
    planoLabel: string;
    investimento: string;
    investimentoLabel: string;
    status: CadastroStatus | string;
    indicacao: string;
    observacoes: string;
    createdAtISO?: string;
    createdDate: Date | null;
}

const statusLabel: Record<CadastroStatus, string> = {
    novo: "Novo",
    contatado: "Contatado",
    fechado: "Fechado",
    cancelado: "Cancelado",
};

function formatDate(date: Date | null): string {
    if (!date) return "-";
    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(date);
}

function isValidStatus(value: string): value is CadastroStatus {
    return CADASTRO_STATUS.includes(value as CadastroStatus);
}

export default function AdminPanel() {
    const [isLogged, setIsLogged] = useState(false);
    const [checkingSession, setCheckingSession] = useState(true);
    const [loggingIn, setLoggingIn] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);

    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");

    const [cadastros, setCadastros] = useState<PreCadastroDoc[]>([]);
    const [loadingCadastros, setLoadingCadastros] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("todos");
    const [planFilter, setPlanFilter] = useState("todos");

    useEffect(() => {
        try {
            const hasSession = localStorage.getItem(ADMIN_SESSION_KEY) === "1";
            setIsLogged(hasSession);
        } catch {
            setIsLogged(false);
        } finally {
            setCheckingSession(false);
        }
    }, []);

    const fetchCadastros = async () => {
        setLoadingCadastros(true);
        setLoadError(null);

        try {
            const q = query(
                collection(db, FIRESTORE_COLLECTIONS.preCadastros),
                orderBy("createdAt", "desc"),
                limit(500)
            );
            const snap = await getDocs(q);
            const items: PreCadastroDoc[] = snap.docs.map((item) => {
                const data = item.data() as Record<string, unknown>;
                const createdAtRaw = data.createdAt as { toDate?: () => Date } | undefined;
                const createdDate =
                    createdAtRaw?.toDate?.() ??
                    (typeof data.createdAtISO === "string"
                        ? new Date(data.createdAtISO)
                        : null);

                return {
                    id: item.id,
                    empresa: String(data.empresa ?? ""),
                    responsavel: String(data.responsavel ?? ""),
                    whatsapp: String(data.whatsapp ?? ""),
                    email: String(data.email ?? ""),
                    segmento: String(data.segmento ?? ""),
                    plano: String(data.plano ?? ""),
                    planoLabel: String(data.planoLabel ?? ""),
                    investimento: String(data.investimento ?? ""),
                    investimentoLabel: String(data.investimentoLabel ?? ""),
                    status: String(data.status ?? "novo"),
                    indicacao: String(data.indicacao ?? ""),
                    observacoes: String(data.observacoes ?? ""),
                    createdAtISO:
                        typeof data.createdAtISO === "string" ? data.createdAtISO : undefined,
                    createdDate: createdDate && !Number.isNaN(createdDate.getTime()) ? createdDate : null,
                };
            });
            setCadastros(items);
        } catch (error) {
            console.error("Erro ao carregar pré-cadastros:", error);
            setLoadError("Não foi possível carregar os cadastros. Verifique as permissões do Firestore.");
        } finally {
            setLoadingCadastros(false);
        }
    };

    useEffect(() => {
        if (!isLogged) return;
        void fetchCadastros();
    }, [isLogged]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError(null);
        setLoggingIn(true);

        try {
            const loginRef = doc(db, FIRESTORE_COLLECTIONS.login, ADMIN_LOGIN_DOC_ID);
            const snap = await getDoc(loginRef);

            if (!snap.exists()) {
                setLoginError("Login administrativo não encontrado.");
                return;
            }

            const adminData = snap.data() as { login?: string; senha?: string };
            const isValid =
                login.trim() === (adminData.login ?? "") && senha === (adminData.senha ?? "");

            if (!isValid) {
                setLoginError("Login ou senha inválidos.");
                return;
            }

            localStorage.setItem(ADMIN_SESSION_KEY, "1");
            setIsLogged(true);
            setLogin("");
            setSenha("");
        } catch (error) {
            console.error("Erro ao autenticar admin:", error);
            setLoginError("Falha ao validar login. Verifique conexão e permissões.");
        } finally {
            setLoggingIn(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem(ADMIN_SESSION_KEY);
        setIsLogged(false);
        setCadastros([]);
        setSearch("");
        setPlanFilter("todos");
        setStatusFilter("todos");
    };

    const handleStatusUpdate = async (cadastroId: string, nextStatus: CadastroStatus) => {
        setStatusUpdatingId(cadastroId);
        try {
            await updateDoc(doc(db, FIRESTORE_COLLECTIONS.preCadastros, cadastroId), {
                status: nextStatus,
                updatedAt: serverTimestamp(),
                updatedAtISO: new Date().toISOString(),
            });

            setCadastros((prev) =>
                prev.map((item) =>
                    item.id === cadastroId ? { ...item, status: nextStatus } : item
                )
            );
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
            alert("Não foi possível atualizar o status.");
        } finally {
            setStatusUpdatingId(null);
        }
    };

    const filteredCadastros = useMemo(() => {
        const term = search.trim().toLowerCase();
        return cadastros.filter((item) => {
            const matchesTerm =
                !term ||
                item.empresa.toLowerCase().includes(term) ||
                item.responsavel.toLowerCase().includes(term) ||
                item.whatsapp.toLowerCase().includes(term) ||
                item.email.toLowerCase().includes(term);

            const matchesStatus =
                statusFilter === "todos" || String(item.status) === statusFilter;
            const matchesPlan = planFilter === "todos" || item.plano === planFilter;

            return matchesTerm && matchesStatus && matchesPlan;
        });
    }, [cadastros, search, statusFilter, planFilter]);

    const stats = useMemo(() => {
        const base = {
            total: cadastros.length,
            novo: 0,
            contatado: 0,
            fechado: 0,
            cancelado: 0,
        };

        for (const item of cadastros) {
            if (isValidStatus(String(item.status))) base[item.status] += 1;
        }

        return base;
    }, [cadastros]);

    if (checkingSession) {
        return (
            <main className="min-h-screen flex items-center justify-center px-6">
                <p className="text-text-secondary">Carregando administrativo...</p>
            </main>
        );
    }

    if (!isLogged) {
        return (
            <main className="min-h-screen flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-md glass-card rounded-3xl p-8 md:p-10">
                    <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-3">
                        Administrativo
                    </p>
                    <h1 className="font-display font-bold text-3xl text-white mb-2">
                        Acesso Restrito
                    </h1>
                    <p className="text-text-muted text-sm mb-8">
                        Entre com login e senha do administrador.
                    </p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="text-text-secondary text-sm font-medium mb-1.5 block">
                                Login
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                placeholder="Seu login"
                                autoComplete="username"
                            />
                        </div>
                        <div>
                            <label className="text-text-secondary text-sm font-medium mb-1.5 block">
                                Senha
                            </label>
                            <input
                                type="password"
                                className="form-input"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="Sua senha"
                                autoComplete="current-password"
                            />
                        </div>

                        {loginError && <p className="text-red-400 text-sm">{loginError}</p>}

                        <button
                            type="submit"
                            disabled={loggingIn}
                            className="btn-glow w-full disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loggingIn ? "Entrando..." : "Entrar no Painel"}
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen py-8 md:py-10">
            <section className="section-shell max-w-[min(96vw,112rem)]">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
                    <div>
                        <p className="text-primary text-sm font-semibold tracking-widest uppercase">
                            Administrativo
                        </p>
                        <h1 className="font-display font-bold text-3xl md:text-4xl text-white mt-2">
                            Gestão de Pré-cadastros
                        </h1>
                        <p className="text-text-muted mt-2 text-sm md:text-base">
                            Veja e atualize o andamento de cada adesão.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={() => void fetchCadastros()}
                            disabled={loadingCadastros}
                            className="btn-outline !py-2.5 !px-5 text-sm disabled:opacity-60"
                        >
                            {loadingCadastros ? "Atualizando..." : "Atualizar dados"}
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-dark-surface border border-dark-border text-text-secondary hover:text-white hover:border-primary/60 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                        >
                            Sair
                        </button>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-7">
                    <div className="glass-card rounded-2xl p-4">
                        <p className="text-text-muted text-xs uppercase tracking-wider">Total</p>
                        <p className="font-display text-3xl text-white mt-1">{stats.total}</p>
                    </div>
                    <div className="glass-card rounded-2xl p-4">
                        <p className="text-text-muted text-xs uppercase tracking-wider">Novos</p>
                        <p className="font-display text-3xl text-white mt-1">{stats.novo}</p>
                    </div>
                    <div className="glass-card rounded-2xl p-4">
                        <p className="text-text-muted text-xs uppercase tracking-wider">Contatados</p>
                        <p className="font-display text-3xl text-white mt-1">{stats.contatado}</p>
                    </div>
                    <div className="glass-card rounded-2xl p-4">
                        <p className="text-text-muted text-xs uppercase tracking-wider">Fechados</p>
                        <p className="font-display text-3xl text-white mt-1">{stats.fechado}</p>
                    </div>
                    <div className="glass-card rounded-2xl p-4">
                        <p className="text-text-muted text-xs uppercase tracking-wider">Cancelados</p>
                        <p className="font-display text-3xl text-white mt-1">{stats.cancelado}</p>
                    </div>
                </div>

                <div className="glass-card rounded-2xl p-4 md:p-5 mb-6">
                    <div className="grid md:grid-cols-3 gap-3">
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Buscar por empresa, responsável, WhatsApp ou e-mail"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <select
                            className="form-input"
                            value={planFilter}
                            onChange={(e) => setPlanFilter(e.target.value)}
                        >
                            <option value="todos">Todos os planos</option>
                            {PRE_CADASTRO_PLANOS.map((plan) => (
                                <option key={plan.value} value={plan.value}>
                                    {plan.label}
                                </option>
                            ))}
                        </select>
                        <select
                            className="form-input"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="todos">Todos os status</option>
                            {CADASTRO_STATUS.map((status) => (
                                <option key={status} value={status}>
                                    {statusLabel[status]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {loadError && (
                    <div className="glass-card rounded-2xl p-4 border border-red-500/40 mb-6">
                        <p className="text-red-300 text-sm">{loadError}</p>
                    </div>
                )}

                <div className="hidden md:block glass-card rounded-2xl overflow-hidden border border-white/10">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[980px]">
                            <thead>
                                <tr className="bg-white/[0.04] text-left">
                                    <th className="px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Data</th>
                                    <th className="px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Empresa</th>
                                    <th className="px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Contato</th>
                                    <th className="px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Plano</th>
                                    <th className="px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Investimento</th>
                                    <th className="px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCadastros.map((item) => (
                                    <tr key={item.id} className="border-t border-white/8 align-top">
                                        <td className="px-4 py-3 text-sm text-text-secondary whitespace-nowrap">
                                            {formatDate(item.createdDate)}
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="text-white text-sm font-semibold">{item.empresa || "-"}</p>
                                            <p className="text-text-muted text-xs mt-1">{item.segmento || "-"}</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="text-text-secondary text-sm">{item.responsavel || "-"}</p>
                                            <p className="text-text-muted text-xs mt-1">{item.whatsapp || "-"}</p>
                                            <p className="text-text-muted text-xs">{item.email || "-"}</p>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-text-secondary">
                                            {item.planoLabel || item.plano || "-"}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-text-secondary">
                                            {item.investimentoLabel || item.investimento || "-"}
                                        </td>
                                        <td className="px-4 py-3">
                                            <select
                                                className="form-input !py-2.5 !text-sm min-w-[160px]"
                                                value={isValidStatus(String(item.status)) ? item.status : "novo"}
                                                onChange={(e) => {
                                                    const next = e.target.value;
                                                    if (isValidStatus(next)) {
                                                        void handleStatusUpdate(item.id, next);
                                                    }
                                                }}
                                                disabled={statusUpdatingId === item.id}
                                            >
                                                {CADASTRO_STATUS.map((status) => (
                                                    <option key={status} value={status}>
                                                        {statusLabel[status]}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="md:hidden space-y-4">
                    {filteredCadastros.map((item) => (
                        <article key={item.id} className="glass-card rounded-2xl p-4 border border-white/10">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="text-white font-semibold">{item.empresa || "-"}</h3>
                                    <p className="text-text-muted text-xs mt-1">{formatDate(item.createdDate)}</p>
                                </div>
                                <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                                    {item.planoLabel || item.plano || "-"}
                                </span>
                            </div>

                            <div className="mt-4 space-y-2 text-sm">
                                <p className="text-text-secondary">
                                    <span className="text-text-muted">Responsável:</span> {item.responsavel || "-"}
                                </p>
                                <p className="text-text-secondary">
                                    <span className="text-text-muted">Contato:</span> {item.whatsapp || "-"}
                                </p>
                                <p className="text-text-secondary break-all">
                                    <span className="text-text-muted">E-mail:</span> {item.email || "-"}
                                </p>
                                <p className="text-text-secondary">
                                    <span className="text-text-muted">Investimento:</span>{" "}
                                    {item.investimentoLabel || item.investimento || "-"}
                                </p>
                            </div>

                            <div className="mt-4">
                                <select
                                    className="form-input !py-2.5 !text-sm"
                                    value={isValidStatus(String(item.status)) ? item.status : "novo"}
                                    onChange={(e) => {
                                        const next = e.target.value;
                                        if (isValidStatus(next)) {
                                            void handleStatusUpdate(item.id, next);
                                        }
                                    }}
                                    disabled={statusUpdatingId === item.id}
                                >
                                    {CADASTRO_STATUS.map((status) => (
                                        <option key={status} value={status}>
                                            {statusLabel[status]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </article>
                    ))}
                </div>

                {!loadingCadastros && filteredCadastros.length === 0 && (
                    <div className="glass-card rounded-2xl p-8 text-center mt-6">
                        <p className="text-text-secondary">Nenhum cadastro encontrado com os filtros atuais.</p>
                    </div>
                )}
            </section>
        </main>
    );
}
