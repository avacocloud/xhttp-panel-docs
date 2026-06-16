"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function DocsSidebar() {
  const pathname = usePathname();
  const { t, dir } = useI18n();
  const [hash, setHash] = useState("");

  useEffect(() => {
    setHash(window.location.hash);
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  const SECTIONS = [
    {
      title: t("شروع سریع", "Get Started"),
      items: [
        { href: "/docs/installation",        label: t("نصب پنل", "Install Panel") },
        { href: "/docs/cli-setup",           label: t("راه‌اندازی Edge Relay", "Edge Relay Setup") },
      ],
    },
    {
      title: t("قابلیت‌ها", "Features"),
      items: [
        { href: "/docs/features",            label: t("مرور کلی", "Overview") },
        { href: "/docs/features#clients",    label: t("مدیریت کلاینت", "Client Management") },
        { href: "/docs/features#inbounds",   label: t("اینباندها", "Inbounds") },
        { href: "/docs/features#deploy",     label: t("دیپلوی", "Deploy") },
        { href: "/docs/features#traffic",    label: t("ترافیک و آمار", "Traffic & Stats") },
      ],
    },
    {
      title: t("منابع", "Resources"),
      items: [
        { href: "/docs/changelog",           label: "Changelog" },
        { href: "/docs/faq",                 label: t("سوالات متداول", "FAQ") },
      ],
    },
  ];

  const Chevron = dir === "rtl" ? ChevronLeft : ChevronRight;
  const borderSide = dir === "rtl" ? "border-l" : "border-r";

  return (
    <aside className={`w-44 shrink-0 sticky top-14 self-start h-[calc(100vh-3.5rem)] overflow-y-auto py-6
      ${dir === "rtl" ? "pr-2 pl-1" : "pl-2 pr-1"}
      ${borderSide} border-border/60`}>
      {SECTIONS.map((section) => (
        <div key={section.title} className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2 px-2">
            {section.title}
          </p>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const [itemPath, itemHash] = item.href.split("#");
              const active = itemHash
                ? pathname === itemPath && hash === `#${itemHash}`
                : pathname === item.href && !hash;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
                      active
                        ? "bg-muted text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }`}
                  >
                    <Chevron className="h-3 w-3 opacity-40 shrink-0" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
}
