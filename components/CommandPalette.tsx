"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchAll, SearchHit } from "@/lib/search";
import { subjectUrl } from "@/lib/urls";

const TYPE_LABEL: Record<SearchHit["matchType"], string> = {
  subject: "Subject",
  module: "Module",
  definition: "Definition",
  concept: "Concept",
  formula: "Formula",
  question: "Exam Q",
  revision: "Revision",
  "worked-example": "Example",
  selfcheck: "Self-Check",
  comparison: "Compare",
  intuition: "Intuition",
  "learn-subject": "CS Path",
  "learn-topic": "CS Topic",
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const hits = query.trim() ? searchAll(query) : [];

  useEffect(() => {
    function onOpen() {
      setOpen(true);
    }
    function onClose() {
      setOpen(false);
    }
    window.addEventListener("tkm:open-palette", onOpen);
    window.addEventListener("tkm:close-palette", onClose);
    return () => {
      window.removeEventListener("tkm:open-palette", onOpen);
      window.removeEventListener("tkm:close-palette", onClose);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  function goTo(hit: SearchHit) {
    setOpen(false);
    const path = hit.href ?? subjectUrl(hit.programId, hit.semesterId, hit.subjectSlug, hit.moduleId);
    router.push(path);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, hits.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && hits[active]) {
      e.preventDefault();
      goTo(hits[active]);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-[10vh]"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Search notes"
    >
      <div
        className="w-full max-w-xl bg-bg-raised border border-bg-border rounded-card shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-bg-border px-3">
          <span className="text-ink-faint text-sm">⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search subjects, modules, questions, formulas, revision…"
            className="w-full bg-transparent py-3 text-sm text-ink-hi placeholder:text-ink-faint outline-none"
            aria-label="Search query"
          />
          <kbd className="shrink-0 font-mono text-[10px] text-ink-faint border border-bg-border rounded px-1.5 py-0.5">
            ESC
          </kbd>
        </div>

        <div className="max-h-[50vh] overflow-y-auto">
          {hits.length === 0 && (
            <div className="px-4 py-6 text-center">
              {query.trim() ? (
                <div className="space-y-2">
                  <p className="text-sm text-ink-hi">No results for &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-ink-faint">Try searching for:</p>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {["span", "basis", "eigenvalues", "thevenin", "flip flop", "complex analysis"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className="font-mono text-[11px] uppercase tracking-wide px-2.5 py-1 rounded-md border border-bg-border text-ink-faint hover:border-signal hover:text-ink-hi transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-ink-lo">Start typing to search across all subjects.</div>
              )}
            </div>
          )}

          {hits.length > 0 && (
            <ul className="py-1">
              {hits.map((hit, i) => (
                <li key={i}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={() => goTo(hit)}
                    className={`w-full text-left px-3 py-2 flex items-center gap-2.5 ${
                      i === active ? "bg-bg-surface" : ""
                    }`}
                  >
                    <span className="shrink-0 w-20 font-mono text-[10px] uppercase tracking-wide text-signal">
                      {TYPE_LABEL[hit.matchType]}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-ink-hi truncate">{hit.snippet}</span>
                      <span className="block text-[11px] font-mono text-ink-faint truncate">
                        {hit.href
                          ? `Learn CS · ${hit.subjectName}`
                          : `${hit.programId} · ${hit.semesterId.toUpperCase()} · ${hit.subjectName}`}
                        {hit.moduleTitle ? ` · ${hit.moduleTitle}` : ""}
                      </span>
                    </span>
                    <span className="shrink-0 text-ink-faint text-xs">→</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {hits.length > 0 && (
          <div className="border-t border-bg-border px-3 py-1.5 flex items-center gap-3 text-[10px] font-mono text-ink-faint">
            <span>↑↓ navigate</span>
            <span>↵ open</span>
            <span className="ml-auto">TKM Notes search</span>
          </div>
        )}
      </div>
    </div>
  );
}
