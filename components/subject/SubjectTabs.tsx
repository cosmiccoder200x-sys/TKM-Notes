"use client";

import { useEffect, useState, type ReactNode } from "react";

type TabKey = "overview" | "modules" | "pyqs" | "mastery";

const TABS: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "modules", label: "Modules" },
  { key: "pyqs", label: "PYQs" },
  { key: "mastery", label: "Mastery" },
];

export default function SubjectTabs({
  overview,
  modules,
  pyqs,
  mastery,
}: {
  overview: ReactNode;
  modules: ReactNode;
  pyqs: ReactNode;
  mastery: ReactNode;
}) {
  const [active, setActive] = useState<TabKey>("overview");

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash.startsWith("#m")) {
      setActive("modules");
    }
  }, []);

  const panels: Record<TabKey, ReactNode> = { overview, modules, pyqs, mastery };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Subject sections"
        className="flex gap-1 border-b border-bg-border overflow-x-auto"
      >
        {TABS.map((t) => {
          const selected = active === t.key;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(t.key)}
              className={`font-mono text-[11px] uppercase tracking-wide px-3.5 py-3 transition-colors border-b-2 -mb-px whitespace-nowrap ${
                selected
                  ? "border-signal text-signal"
                  : "border-transparent text-ink-faint hover:text-ink-hi"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="pt-6">{panels[active]}</div>
    </div>
  );
}
