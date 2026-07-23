import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

const title = "Daniela Ferreira | Fisioterapia y Rehabilitación";
const description =
  "Fisioterapia personalizada, recuperación funcional y rehabilitación deportiva con enfoque clínico, humano y tecnológico.";
const siteUrl = "https://daniela-fisio.vercel.app/";
const previewImage = "/og-daniela-fisio.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://daniela-fisio.vercel.app"),
  title: {
    default: title,
    template: "%s | Daniela Ferreira",
  },
  description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Daniela Ferreira Fisioterapia y Rehabilitación",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Daniela Ferreira, fisioterapeuta especializada en fisioterapia y rehabilitación",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [previewImage],
  },
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
