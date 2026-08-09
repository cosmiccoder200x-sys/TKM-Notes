"use client";

import { useState, useMemo, useCallback } from "react";
import { StudyPrompt, CATEGORIES, IMPORTANCE_META } from "@/lib/prompts/types";
import { renderPromptPreview, generatePrompt, copyToClipboard } from "@/lib/prompts/utils";

const IMPORTANCE_STYLES: Record<string, string> = {
  essential: "text-signal border-signal-dim bg-signal/10",
  high: "text-weight border-weight-dim bg-weight/10",
  useful: "text-ink-lo border-bg-border",
  specialized: "text-ink-faint border-bg-border",
};

interface PromptCardProps {
  prompt: StudyPrompt;
  onClick: () => void;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

export default function PromptCard({ prompt, onClick, isFavorite, onFavoriteToggle }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const category = CATEGORIES.find((c) => c.id === prompt.category);
  const importance = IMPORTANCE_META[prompt.importance];

  const preview = useMemo(() => renderPromptPreview(prompt), [prompt]);

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(generatePrompt(prompt, {}));
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [prompt]);

  return (
    <div className="card p-4 flex flex-col gap-3 hover:border-signal transition-colors group">
      {/* Category + importance */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl leading-none shrink-0" aria-hidden="true">{prompt.icon}</span>
          <span className="eyebrow truncate">{category?.label || prompt.category.toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span
            className={`font-mono text-[9px] uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-card border ${IMPORTANCE_STYLES[prompt.importance]}`}
            title={importance?.hint}
          >
            {importance?.label}
          </span>
          {onFavoriteToggle && (
            <button
              onClick={(e) => { e.stopPropagation(); onFavoriteToggle(); }}
              className="p-1 rounded-card hover:bg-bg-raised transition-colors"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              aria-pressed={isFavorite}
            >
              <span className={`text-base leading-none ${isFavorite ? "text-signal" : "text-ink-faint"}`}>
                {isFavorite ? "★" : "☆"}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Name + description */}
      <div className="flex flex-col gap-1">
        <h3 className="font-display font-semibold text-ink-hi group-hover:text-signal transition-colors">
          {prompt.title}
        </h3>
        <p className="text-sm text-ink-lo leading-relaxed">{prompt.description}</p>
      </div>

      {/* Best for / when to use */}
      <dl className="space-y-2 text-xs">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">BEST FOR</dt>
          <dd className="text-ink-lo leading-relaxed mt-0.5">{prompt.bestFor}</dd>
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">WHEN TO USE</dt>
          <dd className="text-ink-lo leading-relaxed mt-0.5">{prompt.whenToUse}</dd>
        </div>
      </dl>

      {/* Prompt preview */}
      <div className="bg-bg-raised/60 border border-bg-border rounded-card p-2.5">
        <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-faint mb-1">PROMPT PREVIEW</div>
        <p className="text-[11px] font-mono text-ink-lo leading-relaxed line-clamp-3">{preview}…</p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-1">
        <button
          onClick={handleCopy}
          disabled={copied}
          className={`flex-1 text-center font-mono text-[11px] uppercase tracking-wide py-2 rounded-card border transition-colors disabled:cursor-default ${
            copied
              ? "border-signal text-signal bg-signal/10"
              : "border-signal text-signal hover:bg-signal/10"
          }`}
        >
          {copied ? "Copied ✓" : "Copy Prompt"}
        </button>
        <button
          onClick={onClick}
          className="flex-1 text-center font-mono text-[11px] uppercase tracking-wide py-2 rounded-card border border-bg-border text-ink-hi hover:border-signal hover:text-signal transition-colors"
        >
          Open
        </button>
      </div>
    </div>
  );
}
