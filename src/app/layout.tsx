import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "XHTTP Panel — Docs",
  description: "Official documentation for XHTTP Panel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
