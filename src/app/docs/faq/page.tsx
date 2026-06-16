"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type FAQEntry = { fa: [string, string]; en: [string, string] };
type Section = { fa: string; en: string; items: FAQEntry[] };

const SECTIONS: Section[] = [
  {
    fa: "نصب و سیستم",
    en: "Installation & System",
    items: [
      {
        fa: ["آیا پنل روی Ubuntu 18.04 هم کار می‌کنه؟",
             "خیر. پنل نیاز به Node.js 18+ دارد که روی Ubuntu 20.04 LTS یا بالاتر پشتیبانی می‌شود. توصیه ما Ubuntu 22.04 است."],
        en: ["Does the panel work on Ubuntu 18.04?",
             "No. The panel requires Node.js 18+, which is supported on Ubuntu 20.04 LTS or later. We recommend Ubuntu 22.04."],
      },
      {
        fa: ["حداقل RAM مورد نیاز برای اجرای پنل چقدره؟",
             "حداقل ۲ GB RAM لازمه. پنل به همراه Xray و nginx روی همین سرور اجرا میشه، پس به منابع کافی نیاز داره."],
        en: ["What is the minimum RAM required to run the panel?",
             "At least 2 GB RAM is required. The panel runs alongside Xray and nginx on the same server, so adequate resources are needed."],
      },
      {
        fa: ["چطور رمز پنل رو تغییر بدم؟",
             "از بخش Settings در پنل می‌توانید رمز عبور را تغییر دهید. همچنین با اجرای xhttp-info در سرور می‌توانید رمز ادمین را ریست کنید."],
        en: ["How do I change the panel password?",
             "Go to the Settings section in the panel. You can also run xhttp-info on the server to reset the admin password."],
      },
    ],
  },
  {
    fa: "کانفیگ و اینباند",
    en: "Config & Inbound",
    items: [
      {
        fa: ["آیا می‌توانم چند اینباند با پورت‌های مختلف داشته باشم؟",
             "بله. تعداد دلخواهی اینباند با پروتکل و پورت مختلف می‌توانید اضافه کنید. هر اینباند کلاینت‌های مستقل خود را دارد."],
        en: ["Can I have multiple inbounds on different ports?",
             "Yes. You can add as many inbounds as you like with different protocols and ports. Each inbound has its own independent clients."],
      },
      {
        fa: ["SSL certificate کجا ذخیره می‌شه؟",
             "در مسیر ~/.acme.sh/domain_ecc/ توسط acme.sh ذخیره می‌شه. پنل به‌صورت خودکار این مسیر رو شناسایی و در فرم اینباند پر می‌کنه."],
        en: ["Where is the SSL certificate stored?",
             "At ~/.acme.sh/domain_ecc/ by acme.sh. The panel auto-detects this path and fills it in the inbound form."],
      },
      {
        fa: ["چرا بعد از restart کردن Xray کانکشن‌ها قطع می‌شن؟",
             "این رفتار طبیعی Xray است. پنل تلاش می‌کند تعداد restart‌ها را به حداقل برساند — تمام تغییرات را در یک restart اعمال می‌کند."],
        en: ["Why do connections drop after restarting Xray?",
             "This is normal Xray behavior. The panel minimizes restarts by batching all changes into a single restart."],
      },
    ],
  },
  {
    fa: "دیپلوی Edge Relay",
    en: "Edge Relay Deploy",
    items: [
      {
        fa: ["دیپلوی Deno چقدر طول می‌کشه؟",
             "معمولاً ۳۰ تا ۶۰ ثانیه. پنل با Deno CLI دیپلوی می‌کنه و پیشرفت رو step-by-step نشون می‌ده."],
        en: ["How long does Deno deploy take?",
             "Usually 30–60 seconds. The panel deploys via the Deno CLI and shows progress step by step."],
      },
      {
        fa: ["آیا پنل از IPv6 پشتیبانی می‌کنه؟",
             "Xray از IPv6 پشتیبانی می‌کنه، اما پنل مدیریتی فعلاً روی IPv4 تست شده. اگر مشکلی داشتید در کانال آواکو گزارش بدید."],
        en: ["Does the panel support IPv6?",
             "Xray supports IPv6, but the management panel has only been tested on IPv4. Report issues in the Avacocloud channel."],
      },
    ],
  },
  {
    fa: "ترافیک و پشتیبان‌گیری",
    en: "Traffic & Backup",
    items: [
      {
        fa: ["ترافیک کاربران چطور محاسبه می‌شه؟",
             "پنل هر ۳۰ ثانیه از Xray Stats API داده می‌گیره. برای ثبت ترافیک، کاربر باید email داشته باشه و stats در Xray فعال باشه — پنل این رو خودکار انجام می‌ده."],
        en: ["How is user traffic calculated?",
             "The panel polls the Xray Stats API every 30 seconds. Users must have an email and stats enabled in Xray — the panel handles this automatically."],
      },
      {
        fa: ["آیا پشتیبان‌گیری از تنظیمات ممکنه؟",
             "دیتابیس SQLite در مسیر /root/xhttp-panel/data/panel.db ذخیره می‌شه. کافیه این فایل رو backup بگیری. کانفیگ Xray هم در /usr/local/etc/xray/config.json هست."],
        en: ["Can I back up the panel settings?",
             "The SQLite database is at /root/xhttp-panel/data/panel.db — just back up that file. Xray config is at /usr/local/etc/xray/config.json."],
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-colors ${open ? "border-border" : "border-border/50"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-right hover:bg-muted/20 transition-colors gap-4"
      >
        <span className="text-sm font-medium leading-snug">{q}</span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-4 pt-3 text-sm text-muted-foreground leading-relaxed border-t border-border/40 bg-muted/5">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const { t } = useI18n();

  return (
    <article>
      <div className="mb-10">
        <Badge variant="secondary" className="mb-3">FAQ</Badge>
        <h1 className="text-3xl font-bold tracking-tight">{t("سوالات متداول", "Frequently Asked Questions")}</h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          {t("پاسخ سوال‌های رایج درباره پنل XHTTP.", "Common questions about XHTTP Panel answered.")}
        </p>
      </div>

      <div className="space-y-10">
        {SECTIONS.map((section) => (
          <div key={section.en}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 px-1">
              {t(section.fa, section.en)}
            </h2>
            <div className="space-y-2">
              {section.items.map((faq, i) => (
                <FAQItem key={i} q={t(faq.fa[0], faq.en[0])} a={t(faq.fa[1], faq.en[1])} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-border/60 bg-card px-6 py-5 text-center">
        <p className="text-sm text-muted-foreground">{t("جواب سوالت اینجا نبود؟", "Didn't find your answer?")}</p>
        <a
          href="https://t.me/avacocloud"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:opacity-80 transition-opacity"
        >
          {t("در کانال آواکو بپرس ←", "Ask in the Avacocloud channel →")}
        </a>
      </div>
    </article>
  );
}
