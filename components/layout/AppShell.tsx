"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import SearchBar from "@/components/SearchBar";
import MobileNav from "@/components/MobileNav";
import { subjects } from "@/lib/content";
import { getSubjectCategoryMeta } from "@/lib/branch";
import registry from "@/lib/notes";
import { PRODUCT_NAME } from "@/lib/branch";

// Sidebar nav items
const SIDEBAR_ITEMS = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/planner", label: "Planner", icon: "✱" },
  { href: "/s3", label: "Subjects", icon: "▤" },
  { href: "/prompt-lab", label: "Practice", icon: "⚡" },
  { href: "/night-before", label: "Revision", icon: "⏱" },
];

// Subject codes with notes (registry)
const SUBJECTS_WITH_NOTES = Object.entries(registry).filter(([, v]) => v !== undefined);

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Mobile sidebar overlay
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const mobileSidebarOpen = isMobile ? sidebarOpen : false;

  // Close mobile sidebar on outside click
  useEffect(() => {
    if (mobileSidebarOpen) {
      const onOutside = (e: MouseEvent) => {
        const sidebar = document.getElementById("app-shell-sidebar");
        if (sidebar && !sidebar.contains(e.target as Node)) {
          setMobileOpen(false);
        }
      };
      document.addEventListener("mousedown", onOutside);
      return () => document.removeEventListener("mousedown", onOutside);
    }
  }, [mobileSidebarOpen]);

  function toggleMobile() {
    setMobileOpen((v) => !v);
  }

  function toggleSidebar() {
    setSidebarOpen((v) => !v);
  }

  return (
    <div className="flex h-screen bg-bg text-ink-hi p-0 md:p-3 gap-3 overflow-hidden">
      {/* ── Desktop Sidebar ── */}
      <aside
        id="app-shell-sidebar"
        className="hidden md:flex flex-col w-64 glass-panel rounded-2xl shadow-card shrink-0 border border-bg-border/60"
        role="navigation"
        aria-label="Sidebar navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-5 shrink-0 border-b border-bg-border/40">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-ink-hi text-base tracking-wide bg-gradient-to-r from-signal to-signal-dim bg-clip-text text-transparent">
              {PRODUCT_NAME}
            </span>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col py-4 px-2 space-y-1 text-sm flex-1 overflow-y-auto no-scrollbar">
          {SIDEBAR_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 font-medium
                  ${
                    active
                      ? "text-signal bg-signal/10 shadow-sm border border-signal/15 font-semibold"
                      : "text-ink-lo hover:text-ink-hi hover:bg-bg-raised/80 hover:translate-x-0.5"
                  }`}
              >
                <span aria-hidden className="text-base flex items-center justify-center w-5 h-5">{item.icon}</span>
                <span className="font-display text-sm tracking-wide">
                  {item.label}
                </span>
              </Link>
            );
          })}

          {/* Your Subjects Section nested inside navigation scroll */}
          {SUBJECTS_WITH_NOTES.length > 0 && (
            <div className="pt-4 border-t border-bg-border/30 mt-4 space-y-1">
              <div className="px-4 pb-2">
                <span className="eyebrow text-[9px] tracking-[0.2em]">Your Subjects</span>
              </div>
              {SUBJECTS_WITH_NOTES.map(([code, content]) => {
                const meta = getSubjectCategoryMeta({ code } as any);
                return (
                  <Link
                    key={code}
                    href={`/s3/${code}`}
                    className="flex items-center justify-between px-4 py-2 rounded-lg text-xs text-ink-lo hover:text-ink-hi hover:bg-bg-raised transition-all border border-transparent hover:border-bg-border/30"
                  >
                    <span className="font-mono font-medium">{code}</span>
                    <span className="font-mono text-[9px] bg-bg px-2 py-0.5 rounded-full text-ink-faint border border-bg-border/40">
                      {meta?.shortLabel}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </nav>

        {/* Bottom: theme */}
        <div className="p-4 shrink-0 border-t border-bg-border/40 bg-bg-surface/50 rounded-b-2xl">
          <ThemeToggle compact={false} />
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col overflow-hidden bg-bg-surface md:bg-transparent md:glass-panel md:rounded-2xl md:border md:border-bg-border/60 shadow-sm">
        {/* ── Mobile top bar ── */}
        <div className="h-16 flex md:hidden items-center justify-between px-4 bg-bg-surface/90 backdrop-blur-md border-b border-bg-border shrink-0 z-20">
          <button onClick={toggleMobile} className="p-2 rounded-md hover:bg-bg-raised" aria-label="Menu">
            <span className="text-ink-faint text-xl">☰</span>
          </button>
          <div className="font-display font-semibold text-ink-hi text-base">
            {PRODUCT_NAME}
          </div>
          <div className="flex items-center gap-1">
            <SearchBar compact />
            <ThemeToggle compact={true} />
          </div>
        </div>

        {/* ── Content ── */}
        <main className="flex-1 overflow-auto bg-bg/40 pb-20 md:pb-6 p-4 sm:p-6 md:p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {children}
          </div>
        </main>

        {/* ── Mobile bottom nav ── */}
        <div className="md:hidden">
          <MobileNav />
        </div>

        {/* Mobile sidebar overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={toggleMobile}
          >
            <div
              className="absolute left-0 top-0 h-full w-72 bg-bg-surface border-r border-bg-border transform transition-transform duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full p-5">
                <div className="flex items-center justify-between pb-4 border-b border-bg-border/40">
                  <span className="font-display font-bold text-base text-ink-hi">
                    {PRODUCT_NAME}
                  </span>
                  <button onClick={toggleMobile} className="p-2 rounded-md hover:bg-bg-raised" aria-label="Close sidebar">
                    <span className="text-ink-faint text-lg">✕</span>
                  </button>
                </div>
                
                <nav className="flex flex-col flex-1 mt-4 space-y-1 overflow-y-auto no-scrollbar">
                  {SIDEBAR_ITEMS.map((item) => {
                    const active =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={toggleMobile}
                        className={`px-4 py-2.5 rounded-xl transition-colors flex items-center gap-3 ${
                          active
                            ? "text-signal bg-signal/10 font-medium"
                            : "text-ink-lo hover:text-ink-hi hover:bg-bg-raised"
                        }`}
                      >
                        <span aria-hidden>{item.icon}</span>
                        <span className="font-display text-sm tracking-wide">
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
                <div className="pt-4 border-t border-bg-border/40 mt-auto">
                  <ThemeToggle compact={false} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}