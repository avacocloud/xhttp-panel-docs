"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Navbar() {
  const pathname = usePathname();
  const { locale, setLocale, t, dir } = useI18n();

  const NAV = [
    { href: "/docs/installation", label: t("نصب", "Installation") },
    { href: "/docs/features",     label: t("قابلیت‌ها", "Features") },
    { href: "/docs/changelog",    label: "Changelog" },
    { href: "/docs/faq",          label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl pl-4 pr-2 flex h-14 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.png" alt="XHTTP Logo" width={28} height={28} className="dark:invert" />
          <span className="font-bold text-sm tracking-tight">
            {t("پنل XHTTP", "XHTTP Panel")}
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">docs</span>
        </Link>

        <nav className="flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                pathname.startsWith(item.href)
                  ? "bg-muted text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <a
            href="https://t.me/avacocloud"
            target="_blank"
            rel="noopener noreferrer"
            className={`${dir === "rtl" ? "mr-2" : "ml-2"} flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors`}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {t("کانال", "Channel")}
          </a>

          {/* Language toggle */}
          <button
            onClick={() => setLocale(locale === "fa" ? "en" : "fa")}
            className={`${dir === "rtl" ? "mr-1" : "ml-1"} flex items-center gap-1 rounded-lg border border-border/60 bg-muted/50 px-2.5 py-1 text-xs font-mono font-medium hover:bg-muted transition-colors`}
          >
            {locale === "fa" ? "EN" : "FA"}
          </button>
        </nav>
      </div>
    </header>
  );
}
