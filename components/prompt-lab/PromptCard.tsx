"use client";

import { StudyPrompt, StudyModeCategory } from "@/lib/prompts/types";
import { CATEGORIES, CATEGORY_ORDER } from "@/lib/prompts/types";

interface PromptCardProps {
  prompt: StudyPrompt;
  onClick: () => void;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

export default function PromptCard({ prompt, onClick, isFavorite, onFavoriteToggle }: PromptCardProps) {
  const category = CATEGORIES.find(c => c.id === prompt.category);
  
  return (
    <button
      onClick={onClick}
      className="card p-4 flex flex-col gap-3 hover:border-signal transition-colors group text-left"
      aria-label={`Open ${prompt.title} study mode`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-2xl leading-none shrink-0" aria-hidden="true">{prompt.icon}</span>
        {onFavoriteToggle && (
          <button
            onClick={(e) => { e.stopPropagation(); onFavoriteToggle(); }}
            className="shrink-0 p-1 rounded-card hover:bg-bg-raised transition-colors"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={isFavorite}
          >
            <span className={`text-lg ${isFavorite ? "text-signal" : "text-ink-faint"}`}>
              {isFavorite ? "★" : "☆"}
            </span>
          </button>
        )}
      </div>
      
      <div className="flex flex-col gap-1">
        <h3 className="font-display font-semibold text-ink-hi group-hover:text-signal transition-colors">
          {prompt.title}
        </h3>
        <p className="text-sm text-ink-lo leading-relaxed flex-1">
          {prompt.description}
        </p>
      </div>
      
      <div className="flex items-center justify-between pt-1">
        <span className="eyebrow">{category?.label || prompt.category.toUpperCase()}</span>
        <span className="font-mono text-[11px] text-signal shrink-0">
          Open →
        </span>
      </div>
    </button>
  );
}