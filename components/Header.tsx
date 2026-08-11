"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRODUCT_NAME } from "@/lib/branch";
import ThemeToggle from "@/components/ThemeToggle";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/planner", label: "Planner" },
  { href: "/s3", label: "Subjects" },
  { href: "/prompt-lab", label: "Practice" },
  { href: "/night-before", label: "Revision" },
];

export default function Header({
  showSearch = true,
  showPromptLab = true,
}: {
  showSearch?: boolean;
  showPromptLab?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const nav = showPromptLab ? NAV : NAV.filter((n) => n.label.toLowerCase() !== "practice");

  function openSearch() {
    window.dispatchEvent(new CustomEvent("tkm:open-palette"));
  }

  return (
    <header className="sticky top-0 z-40 bg-bg/90 backdrop-blur border-b border-bg-border">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2 leading-tight min-w-0"
          onClick={() => setMenuOpen(false)}
        >
          <span className="font-display font-semibold text-ink-hi text-[15px] tracking-tight whitespace-nowrap">
            Prep<span className="text-signal">Pilot</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 ml-2" aria-label="Main navigation">
          {nav.map((n) => {
            const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`font-mono text-[11px] uppercase tracking-wide px-3 py-1.5 rounded-md transition-colors ${
                  active
                    ? "text-signal bg-signal/10 border border-signal-dim"
                    : "text-ink-faint hover:text-ink-hi hover:bg-bg-surface border border-transparent"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: search + theme */}
        <div className="ml-auto flex items-center gap-2">
          {showSearch && (
            <button
              onClick={openSearch}
              className="hidden sm:flex items-center gap-2 w-40 bg-bg-surface border border-bg-border rounded-md px-2.5 py-1.5 text-xs text-ink-faint hover:border-signal focus:outline-none focus-visible:outline"
              aria-label="Search (Ctrl + K)"
            >
              <span>⌕</span>
              <span className="flex-1 text-left truncate">Search…</span>
              <kbd className="font-mono text-[10px] text-ink-faint border border-bg-border rounded px-1">⌘K</kbd>
            </button>
          )}
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-md hover:bg-bg-surface focus:outline-none focus-visible:outline"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Menu</span>
            <span className={`block w-5 h-px bg-ink-faint transition-all ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`block w-5 h-px bg-ink-faint transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-px bg-ink-faint transition-all ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-bg-border bg-bg-surface" aria-label="Mobile navigation">
          <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col gap-1">
            {nav.map((n) => {
              const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-mono text-sm uppercase tracking-wide px-3 py-2.5 rounded-md ${
                    active ? "text-signal bg-signal/10" : "text-ink-lo hover:text-ink-hi hover:bg-bg"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
            {showSearch && (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openSearch();
                }}
                className="font-mono text-sm uppercase tracking-wide px-3 py-2.5 rounded-md text-ink-lo hover:text-ink-hi hover:bg-bg text-left"
              >
                ⌕ Search
              </button>
            )}
            <div className="px-3 py-2.5">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
