"use client";

import { useEffect, useMemo, useState } from "react";
import { loadResults } from "@/lib/typing/storage";
import { TYPING_CATEGORIES } from "@/lib/typing/catalog";
import { TypingResult } from "@/lib/typing/types";

function shortDate(iso: string): string {
  const d = new Date(iso);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[d.getMonth()]} ${d.getDate()}`;
}

function modeLabel(mode: TypingResult["mode"]): string {
  switch (mode) {
    case "timed":
      return "Timed";
    case "words":
      return "Words";
    case "sentences":
      return "Sentences";
    case "learning":
      return "Learning";
    case "custom":
      return "Custom";
  }
}

export default function HistoryView() {
  const [results, setResults] = useState<TypingResult[]>([]);
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("all");

  useEffect(() => {
    setResults(loadResults());
  }, []);

  const durations = useMemo(() => {
    const set = new Set<number>();
    for (const r of results) set.add(r.targetDuration ?? Math.round(r.duration));
    return [...set].sort((a, b) => a - b);
  }, [results]);

  const filtered = useMemo(() => {
    return results
      .filter((r) => (category === "all" ? true : r.category === category))
      .filter((r) => {
        if (duration === "all") return true;
        return String(r.targetDuration ?? Math.round(r.duration)) === duration;
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [results, category, duration]);

  function clearHistory() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem("tkm_typing_results");
    setResults([]);
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-ink-hi">Typing History</h1>
        <p className="text-sm text-ink-lo mt-1">
          {results.length} test{results.length === 1 ? "" : "s"} recorded.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-bg-surface border border-bg-border rounded-lg px-3 py-2 text-sm text-ink-hi focus:outline-none focus:border-signal/50"
        >
          <option value="all">All categories</option>
          {TYPING_CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="bg-bg-surface border border-bg-border rounded-lg px-3 py-2 text-sm text-ink-hi focus:outline-none focus:border-signal/50"
        >
          <option value="all">All durations</option>
          {durations.map((d) => (
            <option key={d} value={String(d)}>
              {d}s
            </option>
          ))}
        </select>
        {results.length > 0 && (
          <button
            type="button"
            onClick={clearHistory}
            className="font-mono text-[10px] uppercase tracking-wider px-3 py-2 rounded-md border border-critical/40 text-critical hover:bg-critical/10 transition-colors"
          >
            Clear history
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="card px-5 py-8 text-center text-sm text-ink-lo">
          No tests match. Take your first typing test from the{" "}
          <a href="/typing" className="text-signal hover:underline">
            typing home
          </a>
          .
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((r) => (
            <div key={r.id} className="card px-4 py-3 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="font-mono text-[11px] text-ink-lo w-14 shrink-0">
                {shortDate(r.createdAt)}
              </span>
              <span className="chip shrink-0">{modeLabel(r.mode)}</span>
              {r.category != null && (
                <span className="chip shrink-0">{r.category}</span>
              )}
              <span className="font-mono text-[11px] text-ink-faint shrink-0">
                {r.targetDuration != null ? `${r.targetDuration}s` : `${Math.round(r.duration)}s`}
              </span>
              <span className="font-mono text-sm text-ink-hi shrink-0">{r.wpm} WPM</span>
              <span
                className={`font-mono text-sm shrink-0 ${
                  r.accuracy >= 90 ? "text-ink-hi" : r.accuracy >= 75 ? "text-ink-lo" : "text-critical"
                }`}
              >
                {r.accuracy.toFixed(1)}%
              </span>
              <span className="font-mono text-[11px] text-ink-faint shrink-0">
                {r.errors} errors
              </span>
              {r.learningLabel != null && (
                <span className="text-[11px] text-signal shrink-0">{r.learningLabel}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
