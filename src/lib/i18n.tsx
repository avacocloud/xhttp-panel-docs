"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

type Locale = "fa" | "en";
interface I18nCtx { locale: Locale; setLocale: (l: Locale) => void; t: (fa: string, en: string) => string; dir: "rtl" | "ltr"; }

const Ctx = createContext<I18nCtx>({ locale: "fa", setLocale: () => {}, t: (fa) => fa, dir: "rtl" });

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fa");

  useEffect(() => {
    const saved = localStorage.getItem("docs-locale") as Locale;
    if (saved === "en" || saved === "fa") setLocaleState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("docs-locale", l);
  }, []);

  const t = useCallback((fa: string, en: string) => locale === "fa" ? fa : en, [locale]);

  return (
    <Ctx.Provider value={{ locale, setLocale, t, dir: locale === "fa" ? "rtl" : "ltr" }}>
      {children}
    </Ctx.Provider>
  );
}

export const useI18n = () => useContext(Ctx);
