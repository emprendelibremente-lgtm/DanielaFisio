import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Daniela Ferreira — Fisioterapia y Rehabilitación",
    template: "%s | Daniela Ferreira",
  },
  description:
    "Fisioterapia personalizada, recuperación funcional y rehabilitación deportiva con enfoque clínico, humano y tecnológico.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
