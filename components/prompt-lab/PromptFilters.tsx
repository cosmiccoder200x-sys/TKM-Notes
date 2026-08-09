"use client";

import { StudyModeCategory } from "@/lib/prompts/types";
import { CATEGORIES, CATEGORY_ORDER } from "@/lib/prompts/types";

interface PromptFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: StudyModeCategory | "all";
  onCategoryChange: (category: StudyModeCategory | "all") => void;
}

export default function PromptFilters({ 
  searchQuery, 
  onSearchChange, 
  activeCategory, 
  onCategoryChange 
}: PromptFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search prompts…"
          className="w-full bg-bg-surface border border-bg-border rounded-card px-3 py-2 pl-9 text-sm text-ink-hi placeholder:text-ink-faint focus:border-signal outline-none"
          aria-label="Search prompts"
        />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      {/* Category filters */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        <button
          onClick={() => onCategoryChange("all")}
          className={`font-mono text-[11px] uppercase tracking-wide px-3 py-1.5 rounded-card border transition-colors ${
            activeCategory === "all"
              ? "border-signal text-signal bg-signal/10"
              : "border-bg-border text-ink-lo hover:text-ink-hi hover:border-signal"
          }`}
          aria-pressed={activeCategory === "all"}
        >
          All
        </button>
        {CATEGORY_ORDER.map((catId) => {
          const category = CATEGORIES.find(c => c.id === catId);
          if (!category) return null;
          return (
            <button
              key={catId}
              onClick={() => onCategoryChange(catId)}
              className={`font-mono text-[11px] uppercase tracking-wide px-3 py-1.5 rounded-card border transition-colors ${
                activeCategory === catId
                  ? "border-signal text-signal bg-signal/10"
                  : "border-bg-border text-ink-lo hover:text-ink-hi hover:border-signal"
              }`}
              aria-pressed={activeCategory === catId}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}