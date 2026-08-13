"use client";

import dynamic from "next/dynamic";
import Sidebar from "@/components/navigation/Sidebar";
import MobileNavigation from "@/components/navigation/MobileNavigation";

const Header = dynamic(() => import("@/components/Header"), { ssr: false });

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-bg text-ink-hi p-0 md:p-3 gap-3 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden bg-bg-surface md:bg-transparent">
        <Header showNav={false} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-bg/40 pb-20 md:pb-6 p-4 sm:p-6 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">{children}</div>
        </main>

        <div className="md:hidden">
          <MobileNavigation />
        </div>
      </div>
    </div>
  );
}
