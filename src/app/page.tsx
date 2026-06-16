"use client";

import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { useI18n } from "@/lib/i18n";
import { ArrowLeft, ArrowRight, Users, Globe, BarChart2, Shield, Server, Download, Zap } from "lucide-react";

const FEATURES = [
  { icon: Users,    color: "#6366f1", fa: ["مدیریت کلاینت",   "UUID، ترافیک، انقضا، IP محدود"],  en: ["Client Management",   "UUID, traffic, expiry, IP limit"]  },
  { icon: BarChart2,color: "#10b981", fa: ["ترافیک Real-time", "آمار لحظه‌ای از Xray Stats API"], en: ["Real-time Traffic",   "Live stats from Xray Stats API"]   },
  { icon: Server,   color: "#f59e0b", fa: ["مدیریت اینباند",  "VLESS · VMess · Trojan · xhttp"], en: ["Inbound Management", "VLESS · VMess · Trojan · xhttp"]   },
  { icon: Globe,    color: "#3b82f6", fa: ["دیپلوی ابری",     "Railway · Deno · Fastly"],         en: ["Cloud Deploy",       "Railway · Deno · Fastly"]          },
  { icon: Shield,   color: "#8b5cf6", fa: ["SSL خودکار",      "acme.sh و Let's Encrypt"],         en: ["Auto SSL",           "acme.sh & Let's Encrypt"]          },
  { icon: Zap,      color: "#ef4444", fa: ["لینک کانفیگ",    "vless:// اختصاصی هر کاربر"],       en: ["Config Links",       "Per-user vless:// links"]          },
];

export default function Home() {
  const { t, dir } = useI18n();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-4 py-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="relative space-y-6 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {t("نسخه ۱.۰ — پایدار", "Version 1.0 — Stable")}
          </div>
          <div className="flex justify-center">
            <div className="h-20 w-20 rounded-3xl bg-white dark:bg-transparent flex items-center justify-center shadow-2xl ring-8 ring-foreground/10 overflow-hidden">
              <Image src="/logo.png" alt="XHTTP Logo" width={72} height={72} className="dark:invert object-contain" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {t("پنل XHTTP", "XHTTP Panel")}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              {t("پنل مدیریت حرفه‌ای برای Xray-core", "Professional management panel for Xray-core")}
            </p>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {t(
              "مدیریت کلاینت‌ها، اینباندها، ترافیک real-time و دیپلوی relay روی پلتفرم‌های ابری — همه از یک داشبورد ساده و سریع.",
              "Manage clients, inbounds, real-time traffic, and deploy relays to cloud platforms — all from one fast dashboard."
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/docs/installation"
              className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90 transition-opacity">
              <Download className="h-4 w-4" />
              {t("شروع نصب", "Get Started")}
            </Link>
            <Link href="/docs/features"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
              {t("مشاهده قابلیت‌ها", "View Features")}
              <Arrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-4xl w-full px-4 pb-24">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
          {t("قابلیت‌ها", "Features")}
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, color, fa, en }) => (
            <div key={en[0]} className="rounded-xl border border-border/60 bg-card px-4 py-4 flex items-start gap-3 hover:border-border transition-colors">
              <div className="mt-0.5 h-8 w-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
                <Icon className="h-4 w-4" style={{ color }} />
              </div>
              <div>
                <p className="text-sm font-medium">{t(fa[0], en[0])}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t(fa[1], en[1])}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        {t("ساخته‌شده با ❤️ توسط تیم آواکو", "Built with ❤️ by the Avacocloud team")} —{" "}
        <a href="https://t.me/avacocloud" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
          @avacocloud
        </a>
      </footer>
    </div>
  );
}
