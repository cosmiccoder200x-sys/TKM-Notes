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
    <div className="flex h-screen bg-surface text-ink-hi">
      {/* ── Desktop Sidebar ── */}
      <aside
        id="app-shell-sidebar"
        className={`hidden md:flex flex-col w-56 bg-surface border-r border-bg-border transition-all duration-200
          ${sidebarOpen ? "w-60" : "w-56"}`}
        role="navigation"
        aria-label="Sidebar navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between h-14 px-4 shrink-0 border-b border-bg-border">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-ink-hi text-sm">
              {PRODUCT_NAME}
            </span>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-md hover:bg-bg-surface transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
            aria-label="Toggle sidebar"
          >
            <span className="text-ink-faint text-lg">{sidebarOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col py-2 text-sm flex-1">
          {SIDEBAR_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-md transition-colors
                  ${
                    active
                      ? "text-signal bg-signal/10"
                      : "text-ink-lo hover:text-ink-hi hover:bg-bg-surface"
                  }`}
              >
                <span aria-hidden className="text-sm">{item.icon}</span>
                <span className="font-mono text-xs uppercase tracking-wide">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* "Your Subjects" section */}
        {SUBJECTS_WITH_NOTES.length > 0 && (
          <div className="flex-1 overflow-y-auto no-scrollbar border-t border-bg-border">
            <div className="px-4 py-3 border-b border-bg-border">
              <span className="eyebrow text-[11px] uppercase tracking-wide">Your Subjects</span>
            </div>
            {SUBJECTS_WITH_NOTES.map(([code, content]) => {
              const meta = getSubjectCategoryMeta({ code } as any);
              return (
                <Link
                  key={code}
                  href={`/s3/${code}`}
                  className="block px-4 py-2 text-xs text-ink-lo hover:text-ink-hi hover:bg-bg-surface border-b border-bg-border transition-colors flex items-center justify-between"
                >
                  <span className="font-mono">{code}</span>
                  <span className="font-mono text-[10px] text-ink-faint">
                    {meta?.shortLabel}
                  </span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Bottom: theme */}
        <div className="px-4 py-3 shrink-0 border-t border-bg-border">
          <ThemeToggle compact={false} />
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ── Mobile top bar ── */}
        {typeof window !== "undefined" && window.innerWidth < 768 && (
          <div className="h-14 flex items-center justify-between px-4 bg-surface border-b border-bg-border shrink-0">
            <button onClick={toggleMobile} className="p-2 rounded-md hover:bg-bg-surface" aria-label="Menu">
              <span className="text-ink-faint text-xl">☰</span>
            </button>
            <div className="font-display font-semibold text-ink-hi text-base">
              {PRODUCT_NAME}
            </div>
            <SearchBar compact />
            <ThemeToggle compact={false} />
          </div>
        )}

        {/* ── Content ── */}
        <main className="flex-1 overflow-auto bg-bg pb-16 md:pb-0">
          {children}
        </main>

        {/* ── Mobile bottom nav ── */}
        {typeof window !== "undefined" && window.innerWidth < 768 && (
          <MobileNav />
        )}

        {/* Mobile sidebar overlay */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={toggleMobile}
          >
            <div
              className="absolute right-0 top-0 h-full w-72 bg-surface border-l border-bg-border transform transition-transform duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full p-4">
                <button onClick={toggleMobile} className="self-end p-2 rounded-md hover:bg-bg-surface" aria-label="Close sidebar">
                  <span className="text-ink-faint text-lg">✕</span>
                </button>
                <nav className="flex flex-col flex-1 mt-4 overflow-y-auto">
                  {SIDEBAR_ITEMS.map((item) => {
                    const active =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`px-3 py-2 rounded-md transition-colors flex items-center gap-2 ${
                          active
                            ? "text-signal bg-signal/10"
                            : "text-ink-lo hover:text-ink-hi hover:bg-bg-surface"
                        }`}
                      >
                        <span aria-hidden>{item.icon}</span>
                        <span className="font-mono text-xs uppercase tracking-wide">
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
                <ThemeToggle compact={false} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}