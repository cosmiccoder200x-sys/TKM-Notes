"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRIMARY_NAV, MOBILE_NAV } from "@/components/navigation/navItems";
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

          <a
            href="https://github.com/cosmiccoder200x-sys"
            aria-label="GitHub profile — cosmiccoder200x-sys"
            title="GitHub"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-md text-ink-faint hover:text-signal hover:bg-bg-surface transition-colors"
          >
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>

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