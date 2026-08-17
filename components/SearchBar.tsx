"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { searchAll, SearchHit } from "@/lib/search";
import { subjectUrl } from "@/lib/urls";

interface SearchBarProps {
  compact?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  showCount?: number;
  placeholder?: string;
}

export default function SearchBar({
  compact = false,
  value,
  onChange,
  showCount,
  placeholder,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const boxRef = useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined;

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleChange(v: string) {
    if (isControlled) {
      onChange?.(v);
    } else {
      setQuery(v);
      setHits(v.trim() ? searchAll(v) : []);
      setOpen(true);
    }
  }

  function goTo(hit: SearchHit) {
    setOpen(false);
    if (!isControlled) setQuery("");
    const path = hit.href ?? subjectUrl(hit.programId ?? "ER", hit.semesterId, hit.subjectSlug, hit.moduleId ?? undefined);
    router.push(path);
  }

  const displayValue = isControlled ? value : query;
  const displayHits = isControlled ? [] : hits;

  return (
    <div ref={boxRef} className="relative w-full">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            value={displayValue}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => !isControlled && displayValue && setOpen(true)}
            placeholder={placeholder || (compact ? "Search…" : "Search subjects, definitions, concepts…")}
            className="w-full bg-bg-surface border border-bg-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-ink-hi placeholder:text-ink-faint focus:border-signal focus:outline-none transition-colors"
          />
          {showCount !== undefined && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
              {showCount} subject{showCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>
      {!isControlled && open && displayHits.length > 0 && (
        <div className="absolute mt-1.5 w-full max-h-72 overflow-y-auto bg-bg-raised border border-bg-border rounded-card shadow-xl z-30">
          {displayHits.map((hit, i) => (
            <button
              key={i}
              onClick={() => goTo(hit)}
              className="w-full text-left px-3 py-2 hover:bg-bg-surface border-b border-bg-border last:border-0"
            >
              <div className="text-[11px] font-mono text-signal uppercase tracking-wide">
                {hit.href ? "learn-cs" : hit.matchType} · {hit.subjectCode}
              </div>
              <div className="text-sm text-ink-hi truncate">{hit.snippet}</div>
            </button>
          ))}
        </div>
      )}
      {!isControlled && open && displayValue.trim() && displayHits.length === 0 && (
        <div className="absolute mt-1.5 w-full bg-bg-raised border border-bg-border rounded-card px-3 py-2 text-sm text-ink-lo z-30">
          No matches in notes added so far.
        </div>
      )}
    </div>
  );
}