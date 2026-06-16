"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { DocsSidebar } from "@/components/layout/DocsSidebar";
import { useI18n } from "@/lib/i18n";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="mx-auto max-w-7xl w-full flex flex-1 pl-4 pr-2 gap-6 flex-row-reverse">
        <main className="flex-1 py-8 px-4 md:px-20 min-w-0">
          {/* Mobile menu button */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border/60 rounded-lg px-3 py-1.5 transition-colors"
            >
              <Menu className="h-4 w-4" />
              {t("فهرست", "Menu")}
            </button>
          </div>
          {children}
        </main>
        <DocsSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      </div>
    </div>
  );
}
