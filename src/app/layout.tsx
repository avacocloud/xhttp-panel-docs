import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";

const iranSans = localFont({
  src: [
    { path: "../../public/fonts/IRANSans_Light.ttf",  weight: "300" },
    { path: "../../public/fonts/IRANSans.ttf",         weight: "400" },
    { path: "../../public/fonts/IRANSans_Medium.ttf",  weight: "500" },
    { path: "../../public/fonts/IRANSans_Bold.ttf",    weight: "700" },
  ],
  variable: "--font-iran-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "XHTTP Panel — Docs",
  description: "Official documentation for XHTTP Panel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className="dark" suppressHydrationWarning>
      <body className={`${iranSans.variable} min-h-screen bg-background antialiased`}>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
