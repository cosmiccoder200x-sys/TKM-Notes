"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRIMARY_NAV, MOBILE_NAV } from "@/components/navigation/navItems";
import { PRODUCT_NAME } from "@/lib/branch";
import ThemeToggle from "@/components/ThemeToggle";
import SearchResults from "@/components/search/SearchResults";

function isActive(item: { href?: string; label: string }, pathname: string): boolean {
  if (!item.href) return false;
  const base = item.href.split("?")[0];
  if (base === "/") return pathname === "/";
  return pathname === base || pathname.startsWith(base + "/");
}

export default function Header({
  showSearch = true,
  showNav = true,
}: {
  showSearch?: boolean;
  showNav?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    }
    function onPaletteOpen() {
      setSearchOpen(false);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("tkm:open-palette", onPaletteOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("tkm:open-palette", onPaletteOpen);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-bg border-b border-bg-border">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 leading-tight min-w-0"
          onClick={() => setMenuOpen(false)}
        >
          <span className="font-display font-semibold text-ink-hi text-[15px] tracking-tight whitespace-nowrap">{PRODUCT_NAME}</span>
        </Link>

        <nav className={`hidden md:flex items-center gap-1 ml-2 ${showNav ? "" : "md:hidden"}`} aria-label="Main navigation">
          {PRIMARY_NAV.map((n) => {
            const active = isActive(n, pathname);
            const className = `font-mono text-[11px] uppercase tracking-wide px-3 py-1.5 rounded-md transition-colors ${active ? "text-signal bg-signal/10 border border-signal-dim" : "text-ink-faint hover:text-ink-hi hover:bg-bg-surface border border-transparent"}`;
            
            if (n.onClick) {
              return (
                <button
                  key={n.label}
                  type="button"
                  onClick={n.onClick}
                  className={className}
                >
                  {n.label}
                </button>
              );
            }
            if (!n.href) return null;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={className}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {showSearch && (
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 w-40 bg-bg-surface border border-bg-border rounded-md px-2.5 py-1.5 text-xs text-ink-faint hover:border-signal focus:outline-none focus-visible:outline"
              aria-label="Search (Ctrl + K)"
            >
              <span>⌕</span>
              <span className="flex-1 text-left truncate">Search…</span>
              <kbd className="font-mono text-[10px] text-ink-faint border border-bg-border rounded px-1">⌘K</kbd>
            </button>
          )}
          <div className="hidden sm:block"><ThemeToggle /></div>

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

      {menuOpen && (
        <nav className="md:hidden border-t border-bg-border bg-bg-surface" aria-label="Mobile navigation">
          <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col gap-1">
            {MOBILE_NAV.map((n) => {
              const active = isActive(n, pathname);
              const className = `font-mono text-sm uppercase tracking-wide px-3 py-2.5 rounded-md ${active ? "text-signal bg-signal/10" : "text-ink-lo hover:text-ink-hi hover:bg-bg"}`;

              if (n.onClick) {
                return (
                  <button
                    key={n.label}
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      n.onClick?.();
                    }}
                    className={`${className} text-left`}
                  >
                    {n.label}
                  </button>
                );
              }
              if (!n.href) return null;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className={className}
                >
                  {n.label}
                </Link>
              );
            })}
            {showSearch && (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="font-mono text-sm uppercase tracking-wide px-3 py-2.5 rounded-md text-ink-lo hover:text-ink-hi hover:bg-bg text-left"
              >
                ⌕ Search
              </button>
            )}
            <div className="px-3 py-2.5"><ThemeToggle /></div>
          </div>
        </nav>
      )}

      <SearchResults open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}