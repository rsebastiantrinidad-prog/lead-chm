import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LEAD | Diagnóstico 1:1",
  description: "Diagnóstico corporativo del liderazgo operativo y gestión de equipo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#00205B] text-white selection:bg-[#F2A900] selection:text-[#00205B]">{children}</body>
    </html>
  );
}
