import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vitrine LED Veneza — Sua marca onde todos veem",
  description:
    "Pré-cadastre sua empresa na Vitrine LED Veneza. Painel LED de alta definição na BR-040, entrada do Veneza (MG). Se a empresa não está aqui, não está sendo vista.",
  keywords: [
    "LED",
    "painel LED",
    "Veneza",
    "BR-040",
    "publicidade",
    "mídia LED",
    "marketing local",
    "Innova Mídia Led",
  ],
  openGraph: {
    title: "Vitrine LED Veneza — Sua marca onde todos veem",
    description:
      "Pré-cadastre sua empresa na Vitrine LED Veneza. Painel LED de alta definição na BR-040.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
