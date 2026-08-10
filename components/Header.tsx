"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRANCH_SHORT, BRANCH_RANGE } from "@/lib/branch";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/planner", label: "Planner" },
  { href: "/s3", label: "Subjects" },
  { href: "/prompt-lab", label: "Prompt Lab" },
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
  const nav = showPromptLab ? NAV : NAV.filter((n) => n.href !== "/prompt-lab");

  function openSearch() {
    window.dispatchEvent(new CustomEvent("tkm:open-palette"));
  }

  return (
    <header className="sticky top-0 z-40 bg-bg/95 backdrop-blur border-b border-bg-border">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
        {/* Brand */}
        <Link href="/" className="flex flex-col leading-tight min-w-0" onClick={() => setMenuOpen(false)}>
          <span className="font-display font-semibold text-ink-hi text-[15px] tracking-tight whitespace-nowrap">
            Prep<span className="text-signal">Pilot</span>
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-ink-faint whitespace-nowrap">
            {BRANCH_SHORT} · {BRANCH_RANGE}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 ml-6" aria-label="Main navigation">
          {nav.map((n) => {
            const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`font-mono text-[11px] uppercase tracking-wide px-3 py-1.5 rounded-card transition-colors ${
                  active
                    ? "text-signal bg-signal/10 border border-signal-dim"
                    : "text-ink-lo hover:text-signal border border-transparent"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: search */}
        <div className="ml-auto flex items-center gap-2">
          {showSearch && (
            <button
              onClick={openSearch}
              className="hidden sm:flex items-center gap-2 w-44 bg-bg-surface border border-bg-border rounded-card px-2.5 py-1.5 text-xs text-ink-faint hover:border-signal hover:text-ink-lo transition-colors"
              aria-label="Open search"
            >
              <span>⌕</span>
              <span className="flex-1 text-left">Search…</span>
              <kbd className="font-mono text-[10px] text-ink-faint border border-bg-border rounded px-1">
                ⌘K
              </kbd>
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-card hover:bg-bg-surface"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-4 h-px bg-ink-hi transition-transform ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`block w-4 h-px bg-ink-hi transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-4 h-px bg-ink-hi transition-transform ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-bg-border bg-bg" aria-label="Mobile navigation">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {nav.map((n) => {
              const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-mono text-sm uppercase tracking-wide px-3 py-2.5 rounded-card ${
                    active ? "text-signal bg-signal/10" : "text-ink-lo hover:text-ink-hi"
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
                className="font-mono text-sm uppercase tracking-wide px-3 py-2.5 rounded-card text-ink-lo hover:text-ink-hi text-left"
              >
                ⌕ Search
              </button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
