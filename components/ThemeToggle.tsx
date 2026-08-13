"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "pp:theme";
type Theme = "light" | "dark" | "system";

function systemDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function resolve(theme: Theme): boolean {
  if (theme === "dark") return true;
  if (theme === "light") return false;
  return systemDark();
}

function readStored(): Theme {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark" || v === "system") return v;
  } catch {}
  return "dark";
}

// Cycle light -> dark -> system -> light
const ORDER: Theme[] = ["light", "dark", "system"];

export default function ThemeToggle({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(readStored());
    setMounted(true);
  }, []);

  function apply(t: Theme) {
    document.documentElement.classList.toggle("dark", resolve(t));
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {}
  }

  function cycle() {
    const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length];
    setTheme(next);
    apply(next);
  }

  const label = theme === "light" ? "Light" : theme === "dark" ? "Dark" : "System";

  if (compact) {
    return (
      <button
        type="button"
        onClick={cycle}
        aria-label={`Theme: ${label}. Click to change.`}
        title={`Theme: ${label}`}
        className={`inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-ink-faint hover:text-ink-hi transition-colors ${className}`}
      >
        <span aria-hidden>{theme === "light" ? "☀" : theme === "dark" ? "☾" : "◐"}</span>
        {mounted ? <span>{label}</span> : null}
      </button>
    );
  }

  return (
    <div
      className={`inline-flex items-center bg-bg-raised border border-bg-border rounded-md p-0.5 ${className}`}
      role="group"
      aria-label="Theme preference"
    >
      {ORDER.map((t) => {
        const active = mounted && theme === t;
        return (
          <button
            key={t}
            type="button"
            onClick={() => {
              setTheme(t);
              apply(t);
            }}
            aria-pressed={active}
            className={`px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide rounded transition-colors ${
              active ? "bg-bg-surface text-ink-hi shadow-sm" : "text-ink-faint hover:text-ink-hi"
            }`}
          >
            {t === "light" ? "☀ Light" : t === "dark" ? "☾ Dark" : "◐ System"}
          </button>
        );
      })}
    </div>
  );
}
