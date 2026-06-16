"use client";

import { Badge } from "@/components/ui/badge";
import { Terminal, CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { useI18n } from "@/lib/i18n";

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="my-4 rounded-xl border border-border/60 bg-zinc-950 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border/40 bg-zinc-900/50">
        <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs font-mono text-muted-foreground">bash</span>
      </div>
      <pre className="px-4 py-3 text-sm font-mono text-zinc-100 overflow-x-auto leading-relaxed" dir="ltr">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function Note({ type = "info", children }: { type?: "info" | "warning" | "success"; children: React.ReactNode }) {
  const styles = {
    info:    { icon: Info,           border: "border-blue-500/20",    bg: "bg-blue-500/5",    text: "text-blue-400" },
    warning: { icon: AlertTriangle,  border: "border-amber-500/20",   bg: "bg-amber-500/5",   text: "text-amber-400" },
    success: { icon: CheckCircle2,   border: "border-emerald-500/20", bg: "bg-emerald-500/5", text: "text-emerald-400" },
  }[type];
  const Icon = styles.icon;
  return (
    <div className={`my-4 flex gap-3 rounded-xl border ${styles.border} ${styles.bg} px-4 py-3`}>
      <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${styles.text}`} />
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}

function Step({ n, title, desc, auto }: { n: string; title: string; desc: string; auto?: boolean }) {
  return (
    <div className="flex gap-4 rounded-xl border border-border/60 bg-card px-4 py-3">
      <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">{n}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-medium text-sm">{title}</p>
          {auto && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">auto</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

export default function InstallationPage() {
  const { t } = useI18n();

  return (
    <article className="max-w-none">
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">{t("شروع سریع", "Quick Start")}</Badge>
        <h1 className="text-3xl font-bold tracking-tight">{t("نصب پنل XHTTP", "Install XHTTP Panel")}</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          {t(
            "نصب کامل پنل روی Ubuntu 20.04 یا بالاتر — فقط یک دستور، همه چیز خودکار.",
            "Full panel installation on Ubuntu 20.04 or later — one command, fully automatic."
          )}
        </p>
      </div>

      {/* Requirements */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">1</span>
          {t("پیش‌نیازها", "Requirements")}
        </h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {[
            [t("Ubuntu", "Ubuntu"),           t("20.04 LTS یا بالاتر", "20.04 LTS or later")],
            [t("دسترسی root", "Root access"),  t("یا sudo", "or sudo")],
            [t("پورت ۸۰", "Port 80"),          t("باز باشه برای nginx", "open for nginx")],
            [t("اینترنت", "Internet"),          t("برای دانلود پکیج‌ها", "for downloading packages")],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center gap-3 rounded-lg border border-border/60 bg-card px-3 py-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <div>
                <p className="text-sm font-medium">{k}</p>
                <p className="text-xs text-muted-foreground">{v}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Install */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">2</span>
          {t("نصب با یک دستور", "One-line Install")}
        </h2>
        <p className="text-sm text-muted-foreground mb-2">
          {t("با SSH به سرور وصل شو و دستور زیر رو اجرا کن:", "Connect via SSH and run:")}
        </p>
        <CodeBlock>{`bash <(curl -fsSL https://raw.githubusercontent.com/avacocloud/XHTTP-Panel/main/install.sh)`}</CodeBlock>
        <Note type="info">
          {t(
            "هیچ سوالی پرسیده نمیشه — اسکریپت همه چیز رو خودکار نصب و راه‌اندازی می‌کنه.",
            "No questions asked — the script installs and configures everything automatically."
          )}
        </Note>
      </section>

      {/* After install - access panel */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">3</span>
          {t("ورود به پنل", "Access the Panel")}
        </h2>
        <p className="text-sm text-muted-foreground mb-2">
          {t("در پایان اسکریپت آدرس پنل نمایش داده میشه. برای دیدن مجدد:", "At the end of the script the panel URL is shown. To view it again:")}
        </p>
        <CodeBlock>{`xhttp-info`}</CodeBlock>
        <Note type="warning">
          {t(
            "رمز پیش‌فرض admin / admin هست. بلافاصله از بخش Settings تغییرش بده.",
            "Default credentials are admin / admin. Change them immediately from Settings."
          )}
        </Note>
      </section>

      {/* Initial Setup */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">4</span>
          {t("ستاپ اولیه", "Initial Setup")}
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          {t(
            "بعد از ورود، پنل تو صفحه ستاپ اولیه باز میشه. سه مرحله رو به ترتیب انجام بده:",
            "After logging in, the panel opens on the Initial Setup page. Complete the three steps in order:"
          )}
        </p>
        <div className="space-y-3">
          <Step n="1"
            title={t("نصب Xray", "Install Xray")}
            desc={t("روی دکمه Install Xray کلیک کن. هسته Xray-core روی سرور نصب میشه.", "Click the Install Xray button. The Xray-core binary will be installed on the server.")} />
          <Step n="2"
            title={t("نصب acme.sh", "Install acme.sh")}
            desc={t("روی دکمه Install acme.sh کلیک کن. ابزار صدور SSL نصب میشه.", "Click the Install acme.sh button. The SSL issuance tool will be installed.")} />
          <Step n="3"
            title={t("گرفتن گواهی SSL", "Get SSL Certificate")}
            desc={t("در بخش SSL Certificates دامنه‌ات رو وارد کن و Set Certificate رو بزن.", "In the SSL Certificates section, enter your domain and click Set Certificate.")} />
        </div>
        <Note type="info">
          {t(
            "مطمئن شو قبل از Set Certificate، A record دامنه به IP سرور اشاره کنه و ابر Cloudflare خاموش (DNS only) باشه.",
            "Before clicking Set Certificate, make sure your domain's A record points to your server IP and Cloudflare proxy is off (DNS only)."
          )}
        </Note>
      </section>

      {/* Xray Config */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold">5</span>
          {t("ساخت کانفیگ Xray", "Create Xray Config")}
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          {t(
            "بعد از ستاپ اولیه، باید کانفیگ Xray رو بسازی و سرویس رو ری‌استارت کنی:",
            "After the initial setup, create the Xray config and restart the service:"
          )}
        </p>
        <div className="space-y-3">
          <Step n="1"
            title="Initialize Xray Config"
            desc={t("روی دکمه Initialize Xray Config کلیک کن تا فایل کانفیگ ساخته بشه.", "Click the Initialize Xray Config button to generate the configuration file.")} />
          <Step n="2"
            title="Restart Xray"
            desc={t("بعد از ساخت کانفیگ، روی Restart Xray کلیک کن تا سرویس با کانفیگ جدید راه‌اندازی بشه.", "After the config is created, click Restart Xray to start the service with the new configuration.")} />
          <Step n="3"
            title="Test Connection"
            desc={t("روی Test Connection کلیک کن تا مطمئن بشی Xray داره درست کار می‌کنه.", "Click Test Connection to verify that Xray is running correctly.")} />
        </div>
        <Note type="success">
          {t(
            "اگه Test Connection موفق بود، پنل آماده استفاده‌ست.",
            "If Test Connection succeeds, the panel is ready to use."
          )}
        </Note>
      </section>

{/* Uninstall */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">{t("حذف پنل", "Uninstall")}</h2>
        <CodeBlock>{`pm2 delete xhttp-panel && rm -rf /root/xhttp-panel`}</CodeBlock>
        <Note type="warning">
          {t("این عملیات قابل برگشت نیست. قبلاً بکاپ بگیر.", "This action is irreversible. Back up your data first.")}
        </Note>
      </section>
    </article>
  );
}
