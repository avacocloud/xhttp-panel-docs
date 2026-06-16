"use client";

import { Badge } from "@/components/ui/badge";
import { Zap, Bug, ArrowUp } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const RELEASES = [
  {
    version: "1.0.3",
    date: "",
    type: "upcoming",
    title: { fa: "در راه است", en: "Upcoming" },
    changes: [
      { type: "feature", fa: "مدیریت کامل کلاینت با ترافیک real-time", en: "Full client management with real-time traffic" },
      { type: "feature", fa: "مدیریت اینباند: VLESS، VMess، Trojan، Shadowsocks", en: "Inbound management: VLESS, VMess, Trojan, Shadowsocks" },
      { type: "feature", fa: "تولید لینک کانفیگ برای هر کلاینت", en: "Per-client config link generation" },
      { type: "fix",     fa: "رفع مشکل دیپلوی Deno با REST API v2 و Railway", en: "Fixed Deno deploy via REST API v2 and Railway region" },
    ],
  },
  {
    version: "1.0.2",
    date: "2026-05-13",
    type: "fix",
    title: { fa: "رفع باگ‌های نصب و SSL", en: "Install & SSL bug fixes" },
    changes: [
      { type: "fix", fa: "رفع خطای email validation هنگام صدور SSL با acme.sh", en: "Fixed email validation error during SSL issuance with acme.sh" },
      { type: "fix", fa: "رفع خطای قطع شدن نصب در صورت failure در npm install", en: "Fixed install abort on npm install failure" },
      { type: "fix", fa: "رفع مسیر اشتباه tarball هنگام آپدیت", en: "Fixed incorrect tarball path during update" },
    ],
  },
  {
    version: "1.0.1",
    date: "2026-05-10",
    type: "fix",
    title: { fa: "رفع باگ‌های دیپلوی و اتصال", en: "Deploy & connection bug fixes" },
    changes: [
      { type: "feature", fa: "افزودن دستور xhttp-info update برای آپدیت آسان از ترمینال", en: "Added xhttp-info update command for easy terminal updates" },
      { type: "fix",     fa: "حفظ دیتابیس، توکن‌ها و کلیدها هنگام آپدیت", en: "Preserved database, tokens, and keys during update" },
      { type: "fix",     fa: "رفع مشکل دیپلوی Vercel و Netlify (فایل‌های گمشده)", en: "Fixed Vercel and Netlify deploy (missing files)" },
      { type: "fix",     fa: "رفع مشکل SSL — اجبار Let's Encrypt و پاک‌سازی کش ZeroSSL", en: "Fixed SSL — forced Let's Encrypt and cleared ZeroSSL cache" },
      { type: "fix",     fa: "رفع مشکل تست اتصال relay (check-relay)", en: "Fixed relay connection test (check-relay)" },
      { type: "fix",     fa: "رفع تداخل subdomain در دیپلوی همزمان Vercel و Netlify", en: "Fixed subdomain conflict on simultaneous Vercel/Netlify deploys" },
    ],
  },
  {
    version: "1.0.0",
    date: "2026-05-08",
    type: "release",
    title: { fa: "انتشار اولیه", en: "Initial release" },
    changes: [
      { type: "feature", fa: "دیپلوی Edge Relay روی Vercel، Netlify، Railway، Deno، Fastly و Azure", en: "Edge Relay deploy on Vercel, Netlify, Railway, Deno, Fastly, and Azure" },
      { type: "feature", fa: "SSL خودکار با acme.sh",                                   en: "Automatic SSL with acme.sh" },
      { type: "feature", fa: "رابط کاربری فارسی و انگلیسی",                          en: "Persian and English UI" },
    ],
  },
];

const icons = {
  feature: { icon: Zap,    border: "border-indigo-500/40", bg: "bg-indigo-500/10", text: "text-indigo-400", fa: "قابلیت جدید", en: "Feature" },
  fix:     { icon: Bug,    border: "border-rose-500/40",   bg: "bg-rose-500/10",   text: "text-rose-400",   fa: "رفع باگ",     en: "Bug Fix" },
  improve: { icon: ArrowUp, border: "border-amber-500/40", bg: "bg-amber-500/10",  text: "text-amber-400",  fa: "بهبود",       en: "Improve" },
};

const typeColors = {
  upcoming: { border: "border-amber-500/30",   dot: "bg-amber-500",   badge: "bg-amber-500/10 text-amber-400"   },
  release:  { border: "border-indigo-500/30",  dot: "bg-indigo-500",  badge: "bg-indigo-500/10 text-indigo-400"  },
  fix:      { border: "border-emerald-500/30", dot: "bg-emerald-500", badge: "bg-emerald-500/10 text-emerald-400" },
};

export default function ChangelogPage() {
  const { t } = useI18n();

  return (
    <article>
      <div className="mb-10">
        <Badge variant="secondary" className="mb-3">Changelog</Badge>
        <h1 className="text-3xl font-bold tracking-tight">{t("تاریخچه نسخه‌ها", "Version History")}</h1>
        <p className="mt-3 text-muted-foreground">{t("همه تغییرات و آپدیت‌های پنل XHTTP.", "All changes and updates to XHTTP Panel.")}</p>
      </div>

      <div className="relative">
        <div className="absolute top-0 bottom-0 right-[11px] w-px bg-border/60" />

        <div className="space-y-8">
          {RELEASES.map((release) => {
            const tc = typeColors[release.type as keyof typeof typeColors] ?? typeColors.fix;
            const releaseLabel = t(
              release.type === "upcoming" ? "به زودی" : release.type === "release" ? "انتشار" : "رفع باگ",
              release.type === "upcoming" ? "Coming Soon" : release.type === "release" ? "Release" : "Bug Fix"
            );
            return (
              <div key={release.version} className="relative pr-8">
                <div className={`absolute top-1.5 right-0 h-[22px] w-[22px] rounded-full border-4 border-background ${tc.dot}`} />
                <div className={`rounded-2xl border ${tc.border} bg-card overflow-hidden`}>
                  <div className="px-5 py-4 border-b border-border/40 flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base">v{release.version}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${tc.badge}`}>
                        {releaseLabel}
                      </span>
                    </div>
                    {release.date && <span className="text-xs text-muted-foreground font-mono">{release.date}</span>}
                  </div>
                  <div className="px-5 py-4">
                    <p className="font-medium text-sm mb-4">{t(release.title.fa, release.title.en)}</p>
                    {(["feature", "fix"] as const).map((groupType) => {
                      const group = release.changes.filter((c) => c.type === groupType);
                      if (!group.length) return null;
                      const meta = icons[groupType];
                      const Icon = meta.icon;
                      return (
                        <div key={groupType} className="mb-4 last:mb-0">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium mb-2 ${meta.border} ${meta.bg} ${meta.text}`}>
                            <Icon className="h-3.5 w-3.5" />
                            {t(meta.fa, meta.en)}
                          </span>
                          <ul className="space-y-1.5 mt-2">
                            {group.map((change, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${meta.bg} border ${meta.border}`} />
                                {t(change.fa, change.en)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}
