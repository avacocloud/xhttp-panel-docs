"use client";

import { Navbar } from "@/components/layout/Navbar";
import { DocsSidebar } from "@/components/layout/DocsSidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="mx-auto max-w-7xl w-full flex flex-1 pl-4 pr-2 gap-6 flex-row-reverse">
        <main className="flex-1 py-8 px-20 min-w-0">{children}</main>
        <DocsSidebar />
      </div>
    </div>
  );
}
