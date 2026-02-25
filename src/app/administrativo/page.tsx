import type { Metadata } from "next";
import AdminPanel from "@/components/admin/AdminPanel";

export const metadata: Metadata = {
    title: "Administrativo | Vitrine LED Veneza",
    description: "Painel administrativo de pré-cadastros da Vitrine LED Veneza.",
};

export default function AdministrativoPage() {
    return <AdminPanel />;
}
