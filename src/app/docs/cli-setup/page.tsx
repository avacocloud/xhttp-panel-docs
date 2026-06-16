"use client";

import { Badge } from "@/components/ui/badge";
import { ExternalLink, Info, AlertTriangle, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";

function Note({ type = "info", children }: { type?: "info" | "warning"; children: React.ReactNode }) {
  const styles = {
    info:    { icon: Info,          border: "border-blue-500/20",  bg: "bg-blue-500/5",  text: "text-blue-400" },
    warning: { icon: AlertTriangle, border: "border-amber-500/20", bg: "bg-amber-500/5", text: "text-amber-400" },
  }[type];
  const Icon = styles.icon;
  return (
    <div className={`my-4 flex gap-3 rounded-xl border ${styles.border} ${styles.bg} px-4 py-3`}>
      <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${styles.text}`} />
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}

function Step({ n, fa, en, color }: { n: number; fa: string; en: string; color: string; }) {
  const { t } = useI18n();
  return (
    <div className="flex gap-3">
      <div className="h-5 w-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold"
        style={{ background: `${color}20`, color }}>
        {n}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{t(fa, en)}</p>
    </div>
  );
}

interface PlatformData {
  id: string;
  name: string;
  color: string;
  border: string;
  bg: string;
  fields: { fa: string; en: string }[];
  tokenHref: string;
  steps: { fa: string; en: string }[];
  panelSteps: { fa: string; en: string }[];
}

function PlatformCard({ p }: { p: PlatformData }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-2xl border ${p.border} overflow-hidden`}>
      {/* Header — always visible, clickable to expand */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-full px-5 py-4 ${p.bg} flex items-center justify-between gap-4 hover:opacity-90 transition-opacity`}>
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: p.color }} />
          <span className="font-semibold text-sm" style={{ color: p.color }}>{p.name}</span>
          <div className="hidden sm:flex gap-1.5">
            {p.fields.map((f) => (
              <span key={f.en} className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-border/50 bg-background/40 text-muted-foreground">
                {t(f.fa, f.en)}
              </span>
            ))}
          </div>
        </div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="px-5 py-5 space-y-6 border-t" style={{ borderColor: `${p.color}20` }}>

          {/* Get token */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: p.color }}>
              {t("دریافت توکن", "Get Token")}
            </p>
            <div className="space-y-3">
              {p.steps.map((s, i) => (
                <Step key={i} n={i + 1} fa={s.fa} en={s.en} color={p.color} />
              ))}
            </div>
            <a href={p.tokenHref} target="_blank" rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono rounded-lg border px-3 py-1.5 transition-colors hover:opacity-80"
              style={{ borderColor: `${p.color}30`, color: p.color, background: `${p.color}08` }}>
              {p.tokenHref.replace("https://", "")} <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="border-t border-border/40" />

          {/* Enter in panel */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-muted-foreground">
              {t("وارد کردن در پنل", "Enter in Panel")}
            </p>
            <div className="space-y-3">
              {p.panelSteps.map((s, i) => (
                <Step key={i} n={i + 1} fa={s.fa} en={s.en} color={p.color} />
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default function CliSetupPage() {
  const { t } = useI18n();

  const PLATFORMS: PlatformData[] = [
    {
      id: "vercel",
      name: "Vercel",
      color: "#6366f1",
      border: "border-indigo-500/20",
      bg: "bg-indigo-500/5",
      fields: [{ fa: "API Token", en: "API Token" }],
      tokenHref: "https://vercel.com/account/tokens",
      steps: [
        { fa: "به vercel.com برو و وارد اکانتت بشو (یا ثبت‌نام کن).", en: "Go to vercel.com and log in (or sign up)." },
        { fa: "از منو بالا روی عکس پروفایل → Settings کلیک کن.", en: "Click your profile picture → Settings." },
        { fa: "از سایدبار Tokens رو انتخاب کن.", en: "Select Tokens from the sidebar." },
        { fa: "روی Create کلیک کن، یه اسم بنویس (مثلاً xhttp-panel) و expiry رو انتخاب کن.", en: "Click Create, enter a name (e.g. xhttp-panel) and choose an expiry." },
        { fa: "توکن نمایش داده میشه — همین الان کپی کن چون دیگه نشون داده نمیشه.", en: "The token appears — copy it now, it won't be shown again." },
      ],
      panelSteps: [
        { fa: "تو پنل به بخش Tokens برو.", en: "In the panel, go to the Tokens section." },
        { fa: "روی Add Token کلیک کن، پلتفرم Vercel رو انتخاب کن.", en: "Click Add Token and select Vercel as the platform." },
        { fa: "توکن رو پیست کن و ذخیره کن.", en: "Paste the token and save." },
        { fa: "بعد از ذخیره، تو بخش Deploy همین توکن رو انتخاب می‌کنی.", en: "After saving, select this token in the Deploy section." },
      ],
    },
    {
      id: "netlify",
      name: "Netlify",
      color: "#10b981",
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/5",
      fields: [{ fa: "Personal Access Token", en: "Personal Access Token" }],
      tokenHref: "https://app.netlify.com/user/applications#personal-access-tokens",
      steps: [
        { fa: "به app.netlify.com برو و وارد اکانتت بشو (یا ثبت‌نام کن).", en: "Go to app.netlify.com and log in (or sign up)." },
        { fa: "از منو بالا روی عکس پروفایل → User settings کلیک کن.", en: "Click your profile picture → User settings." },
        { fa: "پایین صفحه بخش Applications رو پیدا کن.", en: "Scroll down to find the Applications section." },
        { fa: "روی New access token کلیک کن و یه توضیح بنویس.", en: "Click New access token and enter a description." },
        { fa: "توکن رو کپی کن — فقط یه بار نمایش داده میشه.", en: "Copy the token — it's only shown once." },
      ],
      panelSteps: [
        { fa: "تو پنل به بخش Tokens برو.", en: "In the panel, go to the Tokens section." },
        { fa: "روی Add Token کلیک کن، پلتفرم Netlify رو انتخاب کن.", en: "Click Add Token and select Netlify as the platform." },
        { fa: "توکن رو پیست کن و ذخیره کن.", en: "Paste the token and save." },
        { fa: "بعد از ذخیره، تو بخش Deploy همین توکن رو انتخاب می‌کنی.", en: "After saving, select this token in the Deploy section." },
      ],
    },
    {
      id: "deno",
      name: "Deno Deploy",
      color: "#f59e0b",
      border: "border-amber-500/20",
      bg: "bg-amber-500/5",
      fields: [
        { fa: "API Token", en: "API Token" },
        { fa: "Org Name", en: "Org Name" },
      ],
      tokenHref: "https://dash.deno.com/account#access-tokens",
      steps: [
        { fa: "به dash.deno.com برو و وارد بشو.", en: "Go to dash.deno.com and log in." },
        { fa: "روی اسم کاربریت (بالا-چپ) کلیک کن تا org name رو ببینی — همین اسم رو یادداشت کن.", en: "Click your username (top-left) to see your org name — note it down." },
        { fa: "به Account settings → Access Tokens برو.", en: "Go to Account settings → Access Tokens." },
        { fa: "روی New Access Token کلیک کن، اسم بده و بساز.", en: "Click New Access Token, give it a name and create." },
        { fa: "توکن رو کپی کن.", en: "Copy the token." },
      ],
      panelSteps: [
        { fa: "تو پنل به بخش Tokens برو.", en: "In the panel, go to the Tokens section." },
        { fa: "روی Add Token کلیک کن، پلتفرم Deno رو انتخاب کن.", en: "Click Add Token and select Deno as the platform." },
        { fa: "هم API Token و هم Org Name رو وارد کن.", en: "Enter both the API Token and Org Name." },
        { fa: "ذخیره کن و در Deploy انتخاب کن.", en: "Save and select it in the Deploy section." },
      ],
    },
    {
      id: "railway",
      name: "Railway",
      color: "#8b5cf6",
      border: "border-violet-500/20",
      bg: "bg-violet-500/5",
      fields: [{ fa: "API Token", en: "API Token" }],
      tokenHref: "https://railway.app/account/tokens",
      steps: [
        { fa: "به railway.app برو و وارد اکانتت بشو.", en: "Go to railway.app and log in." },
        { fa: "روی عکس پروفایل → Account Settings کلیک کن.", en: "Click your profile picture → Account Settings." },
        { fa: "بخش API Tokens رو پیدا کن و روی Create Token کلیک کن.", en: "Find the API Tokens section and click Create Token." },
        { fa: "اسم بده و توکن رو کپی کن.", en: "Give it a name and copy the token." },
      ],
      panelSteps: [
        { fa: "تو پنل به بخش Tokens برو.", en: "In the panel, go to the Tokens section." },
        { fa: "روی Add Token کلیک کن، پلتفرم Railway رو انتخاب کن.", en: "Click Add Token and select Railway as the platform." },
        { fa: "توکن رو پیست کن و ذخیره کن.", en: "Paste the token and save." },
        { fa: "تو بخش Deploy این توکن رو انتخاب کن.", en: "Select this token in the Deploy section." },
      ],
    },
    {
      id: "fastly",
      name: "Fastly Compute",
      color: "#ef4444",
      border: "border-red-500/20",
      bg: "bg-red-500/5",
      fields: [{ fa: "API Token", en: "API Token" }],
      tokenHref: "https://manage.fastly.com/account/personal/tokens",
      steps: [
        { fa: "به manage.fastly.com برو و وارد بشو.", en: "Go to manage.fastly.com and log in." },
        { fa: "از منو بالا روی Account → Personal API tokens برو.", en: "From the top menu go to Account → Personal API tokens." },
        { fa: "روی Create Token کلیک کن.", en: "Click Create Token." },
        { fa: "اسم بده، scope رو روی Global بذار و بساز.", en: "Give it a name, set scope to Global, and create." },
        { fa: "توکن رو کپی کن — فقط یه بار نشون داده میشه.", en: "Copy the token — shown only once." },
      ],
      panelSteps: [
        { fa: "تو پنل به بخش Tokens برو.", en: "In the panel, go to the Tokens section." },
        { fa: "روی Add Token کلیک کن، پلتفرم Fastly رو انتخاب کن.", en: "Click Add Token and select Fastly as the platform." },
        { fa: "توکن رو پیست کن و ذخیره کن.", en: "Paste the token and save." },
        { fa: "تو بخش Deploy این توکن رو انتخاب کن.", en: "Select this token in the Deploy section." },
      ],
    },
    {
      id: "azure",
      name: "Azure",
      color: "#3b82f6",
      border: "border-blue-500/20",
      bg: "bg-blue-500/5",
      fields: [
        { fa: "App ID", en: "App ID" },
        { fa: "Password", en: "Password" },
        { fa: "Tenant ID", en: "Tenant ID" },
        { fa: "Subscription ID", en: "Subscription ID" },
      ],
      tokenHref: "https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps",
      steps: [
        { fa: "Azure CLI رو روی کامپیوترت نصب کن یا از Azure Cloud Shell استفاده کن.", en: "Install Azure CLI on your machine or use Azure Cloud Shell." },
        { fa: "با دستور az login وارد اکانت Azure بشو.", en: "Log in with az login." },
        { fa: "دستور زیر رو اجرا کن تا Service Principal بسازه:\naz ad sp create-for-rbac --name xhttp-relay --role contributor --scopes /subscriptions/<SUBSCRIPTION_ID>", en: "Run the following to create a Service Principal:\naz ad sp create-for-rbac --name xhttp-relay --role contributor --scopes /subscriptions/<SUBSCRIPTION_ID>" },
        { fa: "خروجی JSON شامل appId، password، tenant میشه — همه رو ذخیره کن.", en: "The JSON output contains appId, password, and tenant — save them all." },
        { fa: "Subscription ID رو با دستور az account show --query id بگیر.", en: "Get your Subscription ID with az account show --query id." },
      ],
      panelSteps: [
        { fa: "تو پنل به بخش Tokens برو.", en: "In the panel, go to the Tokens section." },
        { fa: "روی Add Token کلیک کن، پلتفرم Azure رو انتخاب کن.", en: "Click Add Token and select Azure as the platform." },
        { fa: "چهار فیلد App ID، Password، Tenant ID و Subscription ID رو پر کن.", en: "Fill in the four fields: App ID, Password, Tenant ID, and Subscription ID." },
        { fa: "ذخیره کن و تو بخش Deploy انتخاب کن.", en: "Save and select it in the Deploy section." },
      ],
    },
  ];

  return (
    <article className="max-w-none">
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">{t("ستاپ اولیه", "Initial Setup")}</Badge>
        <h1 className="text-3xl font-bold tracking-tight">
          {t("دریافت توکن پلتفرم‌ها", "Platform Tokens")}
        </h1>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          {t(
            "برای دیپلوی relay، پنل به توکن API پلتفرم انتخابی نیاز داره. روی هر پلتفرم کلیک کن تا راهنما باز بشه.",
            "To deploy a relay, the panel needs an API token for the chosen platform. Click any platform to expand the guide."
          )}
        </p>
      </div>

      <div className="space-y-3">
        {PLATFORMS.map((p) => (
          <PlatformCard key={p.id} p={p} />
        ))}
      </div>

      <Note type="warning">
        {t(
          "توکن رو فقط یه بار نشون میده — بلافاصله کپی کن. اگه گم شد باید توکن جدید بسازی.",
          "The token is shown only once — copy it immediately. If lost, you'll need to create a new one."
        )}
      </Note>
    </article>
  );
}
