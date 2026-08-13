"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useSearchService,
  useDebouncedValue,
  getHighlightSegments,
  CONTENT_TYPE_LABEL,
  type ContentType,
  type SearchFilters,
  type SearchResult,
} from "./SearchService";

const FILTER_OPTIONS: (ContentType | "all")[] = [
  "all",
  "subject",
  "module",
  "definition",
  "formula",
  "question",
  "diagram",
  "selfcheck",
];

const GROUP_ORDER: ContentType[] = [
  "subject",
  "module",
  "definition",
  "question",
  "formula",
  "concept",
  "revision",
  "selfcheck",
  "worked-example",
  "comparison",
  "diagram",
  "crosslink",
  "intuition",
];

const RECENTS_KEY = "tkm.search.recents.v1";

function getRecents(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENTS_KEY);
    const parsed = raw ? (JSON.parse(raw) as string[]) : [];
    return Array.isArray(parsed) ? parsed.slice(0, 8) : [];
  } catch {
    return [];
  }
}

function pushRecent(query: string) {
  try {
    const q = query.trim();
    if (!q) return;
    const next = [q, ...getRecents().filter((r) => r !== q)].slice(0, 8);
    window.localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable — recents are best-effort
  }
}

function groupResults(results: SearchResult[]) {
  const groups = new Map<ContentType, SearchResult[]>();
  for (const r of results) {
    const list = groups.get(r.type) ?? [];
    list.push(r);
    groups.set(r.type, list);
  }
  return GROUP_ORDER.filter((t) => groups.has(t)).map((t) => ({
    type: t,
    results: groups.get(t)!,
  }));
}

export default function SearchResults({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { index, search } = useSearchService();

  const [query, setQuery] = useState("");
  const [contentType, setContentType] = useState<ContentType | "all">("all");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [active, setActive] = useState(0);
  const [recents, setRecents] = useState<string[]>([]);

  const debouncedQuery = useDebouncedValue(query, 300);

  const subjects = useMemo(() => {
    const map = new Map<string, { code: string; name: string }>();
    for (const d of index) {
      if (!map.has(d.subjectCode)) map.set(d.subjectCode, { code: d.subjectCode, name: d.subjectName });
    }
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [index]);

  const results = useMemo(() => {
    if (!open) return [];
    const filters: SearchFilters = {
      contentType,
      semester: "all",
      subject: subjectFilter,
      module: "all",
    };
    return search(debouncedQuery, filters);
  }, [open, search, debouncedQuery, contentType, subjectFilter]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setContentType("all");
      setSubjectFilter("all");
      setActive(0);
      setRecents(getRecents());
      window.dispatchEvent(new CustomEvent("tkm:close-palette"));
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [debouncedQuery, contentType, subjectFilter]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const groups = groupResults(results);
  const flatCount = results.length;

  function go(href: string) {
    pushRecent(debouncedQuery);
    onClose();
    router.push(href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, flatCount - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      const r = results[active];
      if (r) {
        e.preventDefault();
        go(r.href);
      }
    }
  }

  let cursor = -1;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 p-4 pt-[10vh]"
      onClick={onClose}
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
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search subjects, definitions, formulas, questions…"
            className="w-full bg-transparent py-3 text-sm text-ink-hi placeholder:text-ink-faint outline-none"
            aria-label="Search query"
          />
          <kbd className="shrink-0 font-mono text-[10px] text-ink-faint border border-bg-border rounded px-1.5 py-0.5">
            ⌘K
          </kbd>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 border-b border-bg-border overflow-x-auto">
          {FILTER_OPTIONS.map((opt) => {
            const activeFilter = contentType === opt;
            return (
              <button
                key={opt}
                onClick={() => setContentType(opt)}
                className={`font-mono text-[10px] uppercase tracking-wide px-2.5 py-1.5 rounded-card border transition-colors whitespace-nowrap ${
                  activeFilter
                    ? "border-signal text-signal bg-signal/10"
                    : "border-bg-border text-ink-faint hover:text-ink-hi"
                }`}
              >
                {opt === "all" ? "All" : CONTENT_TYPE_LABEL[opt]}
              </button>
            );
          })}
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="ml-auto font-mono text-[10px] uppercase tracking-wide bg-bg border border-bg-border text-ink-faint rounded-card px-2 py-1.5 outline-none"
            aria-label="Filter by subject"
          >
            <option value="all">All subjects</option>
            {subjects.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div
          className="max-h-[50vh] overflow-y-auto"
          role="listbox"
          aria-label="Search results"
        >
          {!debouncedQuery.trim() && recents.length > 0 && (
            <div className="px-4 py-4 space-y-2.5">
              <div className="section-kicker">Recent searches</div>
              <div className="flex flex-wrap gap-1.5">
                {recents.map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setQuery(r);
                      pushRecent(r);
                    }}
                    className="font-mono text-[11px] px-2.5 py-1.5 rounded-card border border-bg-border text-ink-lo hover:border-signal hover:text-signal transition-colors"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.length === 0 && (
            <div className="px-4 py-6 text-center">
              {debouncedQuery.trim() ? (
                <div className="space-y-2">
                  <p className="text-sm text-ink-hi">
                    No results for &ldquo;{debouncedQuery}&rdquo;
                  </p>
                  <p className="text-xs text-ink-faint">Try a subject, module, or exam question term.</p>
                </div>
              ) : recents.length === 0 ? (
                <p className="text-sm text-ink-lo">Start typing to search across all subjects.</p>
              ) : null}
            </div>
          )}

          {results.length > 0 && (
            <div className="py-1">
              {groups.map((group) => (
                <div key={group.type}>
                  <div className="px-3 pt-3 pb-1 section-kicker">
                    {CONTENT_TYPE_LABEL[group.type]}
                    <span className="ml-1.5 text-ink-faintest">· {group.results.length}</span>
                  </div>
                  {group.results.map((r) => {
                    cursor += 1;
                    const rowActive = cursor === active;
                    return (
                      <button
                        key={r.id}
                        role="option"
                        aria-selected={rowActive}
                        onMouseEnter={() => setActive(cursor)}
                        onClick={() => go(r.href)}
                        className={`w-full text-left px-3 py-2 flex items-center gap-2.5 transition-colors ${
                          rowActive ? "bg-bg-surface" : ""
                        }`}
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm text-ink-hi truncate">
                            {getHighlightSegments(r.title, debouncedQuery).map((seg, i) =>
                              seg.match ? (
                                <mark key={i} className="bg-signal/30 text-ink-hi rounded-sm">
                                  {seg.text}
                                </mark>
                              ) : (
                                <span key={i}>{seg.text}</span>
                              )
                            )}
                          </span>
                          <span className="block text-[11px] font-mono text-ink-faint truncate">
                            {r.semesterId.toUpperCase()} · {r.subjectName}
                            {r.moduleTitle ? ` · ${r.moduleTitle}` : ""}
                          </span>
                        </span>
                        <span className="shrink-0 text-ink-faint text-xs">→</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        {results.length > 0 && (
          <div className="border-t border-bg-border px-3 py-1.5 flex items-center gap-3 text-[10px] font-mono text-ink-faint">
            <span>↑↓ navigate</span>
            <span>↵ open</span>
            <span>{results.length} results</span>
            <span className="ml-auto">TKM Notes search</span>
          </div>
        )}
      </div>
    </div>
  );
}