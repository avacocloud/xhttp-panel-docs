"use client";

import { Badge } from "@/components/ui/badge";
import { Users, BarChart2, Server, Globe, Shield, Zap, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function FeaturesPage() {
  const { t } = useI18n();

  const FEATURES = [
    {
      id: "clients", icon: Users, color: "#6366f1",
      badge: t("کلاینت‌ها", "Clients"),
      title: t("مدیریت کلاینت", "Client Management"),
      desc: t("سیستم کامل مدیریت کاربران.", "Full user management system."),
      items: [
        t("افزودن کاربر با UUID اختصاصی", "Add users with unique UUIDs"),
        t("محدودیت ترافیک با ریست خودکار", "Traffic limits with auto-reset"),
        t("تاریخ انقضا با اعلان خودکار", "Expiry dates with auto-notification"),
        t("حداکثر IP همزمان", "Max concurrent IPs"),
        t("فعال/غیرفعال با یک کلیک", "Enable/disable with one click"),
        t("عملیات گروهی (bulk)", "Bulk operations (enable/disable/delete)"),
        t("جستجو بر اساس ایمیل یا UUID", "Search by email or UUID"),
      ],
    },
    {
      id: "traffic", icon: BarChart2, color: "#10b981",
      badge: t("آمار", "Stats"),
      title: t("ترافیک Real-time", "Real-time Traffic"),
      desc: t("رصد لحظه‌ای از Xray Stats API.", "Live monitoring from Xray Stats API."),
      items: [
        t("آپدیت خودکار هر ۳۰ ثانیه", "Auto-update every 30 seconds"),
        t("نمودار تاریخچه ۷ و ۳۰ روزه", "7 and 30-day history charts"),
        t("آپلود و دانلود جداگانه", "Upload & download separately"),
        t("نمایش کاربران آنلاین", "Show online users"),
        t("غیرفعال شدن خودکار کاربران پرمصرف", "Auto-disable over-limit users"),
      ],
    },
    {
      id: "inbounds", icon: Server, color: "#f59e0b",
      badge: t("اینباند", "Inbound"),
      title: t("مدیریت اینباند", "Inbound Management"),
      desc: t("پشتیبانی از پروتکل‌های مختلف Xray.", "Support for all Xray protocols."),
      items: [
        "VLESS · VMess · Trojan · Shadowsocks",
        t("ترنسپورت: xhttp، WebSocket، gRPC", "Transport: xhttp, WebSocket, gRPC"),
        t("TLS و Reality با تنظیمات کامل", "TLS and Reality with full settings"),
        t("پرکردن خودکار مسیر SSL", "Auto-fill SSL certificate path"),
        t("ری‌استارت Xray بدون قطعی", "Xray restart without connection drops"),
      ],
    },
    {
      id: "deploy", icon: Globe, color: "#3b82f6",
      badge: t("دیپلوی", "Deploy"),
      title: t("دیپلوی relay ابری", "Cloud Relay Deploy"),
      desc: t("استقرار روی پلتفرم‌های ابری با یک کلیک.", "One-click deployment to cloud platforms."),
      items: [
        t("Railway — منطقه: eu-west، us-east", "Railway — regions: eu-west, us-east"),
        t("Deno Deploy — منطقه: eu، us، global", "Deno Deploy — regions: eu, us, global"),
        "Fastly Compute",
        t("پیشرفت step-by-step با SSE", "Step-by-step progress via SSE"),
        t("تولید لینک کانفیگ per-client", "Per-client config link generation"),
      ],
    },
    {
      id: "ssl", icon: Shield, color: "#8b5cf6",
      badge: "SSL",
      title: t("مدیریت SSL", "SSL Management"),
      desc: t("صدور و مدیریت گواهی Let's Encrypt.", "Issue and manage Let's Encrypt certificates."),
      items: [
        t("صدور خودکار با acme.sh", "Auto-issue with acme.sh"),
        t("شناسایی خودکار مسیر گواهی", "Auto-detect certificate path"),
        t("بررسی انقضا از داشبورد", "Check expiry from dashboard"),
        t("پشتیبانی از ECC و RSA", "ECC and RSA support"),
      ],
    },
    {
      id: "config", icon: Zap, color: "#ef4444",
      badge: t("کانفیگ", "Config"),
      title: t("لینک کانفیگ", "Config Links"),
      desc: t("تولید لینک اتصال اختصاصی.", "Generate dedicated connection links."),
      items: [
        t("فرمت vless:// با UUID اختصاصی", "vless:// format with unique UUID"),
        t("انتخاب دیپلوی (relay یا مستقیم)", "Choose deployment (relay or direct)"),
        t("کپی با یک کلیک", "One-click copy"),
        t("نمایش در صفحه کلاینت‌ها", "Shown in clients page"),
      ],
    },
  ];

  return (
    <article className="max-w-none">
      <div className="mb-10">
        <Badge variant="secondary" className="mb-3">{t("قابلیت‌ها", "Features")}</Badge>
        <h1 className="text-3xl font-bold tracking-tight">{t("مرور قابلیت‌های پنل", "Panel Features Overview")}</h1>
        <p className="mt-3 text-muted-foreground">{t("همه امکاناتی که پنل XHTTP ارائه می‌دهد.", "Everything XHTTP Panel offers.")}</p>
      </div>

      <div className="space-y-6">
        {FEATURES.map(({ id, icon: Icon, color, badge, title, desc, items }) => (
          <section key={id} id={id} className="rounded-2xl border border-border/60 bg-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border/40 flex items-center gap-3" style={{ background: `${color}08` }}>
              <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold">{title}</h2>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ background: `${color}18`, color }}>{badge}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
            </div>
            <ul className="px-5 py-4 grid gap-2 sm:grid-cols-2">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color }} />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
