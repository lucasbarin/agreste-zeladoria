import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Agreste Zeladoria",
  description: "Sistema de gestão de ocorrências do condomínio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/assets/fonts/tabler-icons.min.css" />
        <link rel="stylesheet" href="/assets/fonts/feather.css" />
        <link rel="stylesheet" href="/assets/fonts/fontawesome.css" />
        <link rel="stylesheet" href="/assets/fonts/material.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/style-preset.css" />
        <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.0.3/src/regular/style.css" />
      </head>
      <body data-pc-preset="preset-1" data-pc-sidebar-theme="dark" data-pc-sidebar-caption="true" data-pc-direction="ltr" data-pc-theme="light">
        <AuthProvider>
          {children}
        </AuthProvider>
        <Script src="/assets/js/plugins/popper.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/plugins/simplebar.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/plugins/bootstrap.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/fonts/custom-font.js" strategy="afterInteractive" />
        <Script src="/assets/js/plugins/feather.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
