"use client";

import { useState } from "react";
import { useActiveSection } from "@/lib/activeSection";

export interface TocItem {
  id: string;
  label: string;
  sub?: { id: string; label: string }[];
}

export default function TopicTOC({ items }: { items: TocItem[] }) {
  const ids = items.flatMap((i) => [i.id, ...(i.sub?.map((s) => s.id) ?? [])]);
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  const isActive = (id: string) => active === id;

  return (
    <>
      {/* Mobile: collapsible "On this page" */}
      <div className="md:hidden mb-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-wide px-3 py-2 rounded-md border border-bg-border text-ink-faint hover:text-ink-hi hover:border-signal focus:outline-none focus-visible:outline"
        >
          <span>On this page</span>
          <svg
            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {open && (
          <nav className="mt-2 block" aria-label="On this page">
            <ul className="space-y-1 border-l border-bg-border pl-4 ml-px">
              {items.map((i) => (
                <li key={i.id}>
                  <a
                    href={`#${i.id}`}
                    className={`block text-xs py-1 text-ink-faint hover:text-signal transition-colors ${
                      isActive(i.id) ? "text-signal font-medium" : ""
                    }`}
                  >
                    {i.label}
                  </a>
                  {i.sub && (
                    <ul className="ml-3 mt-1 space-y-0.5">
                      {i.sub.map((s) => (
                        <li key={s.id}>
                          <a
                            href={`#${s.id}`}
                            className={`block text-[11px] py-0.5 text-ink-faintest hover:text-ink-faint ${
                              isActive(s.id) ? "text-signal" : ""
                            }`}
                          >
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop: sticky table of contents */}
      <nav className="hidden xl:block xl:w-60 shrink-0" aria-label="Table of contents">
        <div className="sticky top-20">
          <div className="font-mono text-[10px] uppercase tracking-wide text-signal mb-2">
            On this page
          </div>
          <ul className="space-y-1 text-xs border-l border-bg-border pl-3 ml-px">
            {items.map((i) => (
              <li key={i.id}>
                <a
                  href={`#${i.id}`}
                  className={`block py-1.5 text-ink-faint hover:text-signal transition-colors ${
                    isActive(i.id) ? "text-signal font-medium" : ""
                  }`}
                >
                  {i.label}
                </a>
                {i.sub && (
                  <ul className="ml-3 mt-1 space-y-0.5">
                    {i.sub.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className={`block py-0.5 text-[11px] text-ink-faintest hover:text-ink-faint ${
                            isActive(s.id) ? "text-signal" : ""
                          }`}
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
      </>
  );
}

