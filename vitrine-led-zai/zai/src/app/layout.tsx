import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vitrine LED Veneza | Onde sua marca deixa de passar despercebida",
  description: "Vitrine LED na entrada do Veneza - BR-040. Pré-cadastre sua empresa e faça sua marca ser vista por milhares todos os dias. Planos a partir de 15 segundos de exposição.",
  keywords: ["LED", "Vitrine", "Publicidade", "Outdoor digital", "Veneza", "BR-040", "Marketing", "Publicidade digital", "Painel LED", "MG"],
  authors: [{ name: "Innova Mídia Led" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Vitrine LED Veneza | Se a empresa não está aqui, não está sendo vista.",
    description: "Transforme fluxo em atenção, lembrança e vendas. Pré-cadastro sem pagamento.",
    url: "https://vitrineledveneza.com.br",
    siteName: "Vitrine LED Veneza",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vitrine LED Veneza - Painel LED na BR-040",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitrine LED Veneza",
    description: "Onde sua marca deixa de passar despercebida. Pré-cadastre-se!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
