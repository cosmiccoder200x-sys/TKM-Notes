"use client";

import { getRecents, clearRecents } from "@/lib/prompts/utils";
import { RecentPrompt, StudyModeId } from "@/lib/prompts/types";
import { getPromptById } from "@/lib/prompts/prompts";
import { useState, useEffect } from "react";
import { NavIcon } from "@/components/navigation/navItems";

interface RecentPromptsProps {
  onRecentSelect: (recent: RecentPrompt) => void;
}

export default function RecentPrompts({ onRecentSelect }: RecentPromptsProps) {
  const [recents, setRecents] = useState<RecentPrompt[]>([]);
  
  useEffect(() => {
    setRecents(getRecents());
  }, []);
  
  const handleClear = () => {
    clearRecents();
    setRecents([]);
  };
  
  if (recents.length === 0) return null;
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-display font-semibold text-ink-hi">Recently Used</h4>
        <button
          onClick={handleClear}
          className="text-xs font-mono text-ink-faint hover:text-critical transition-colors"
        >
          Clear
        </button>
      </div>
      <div className="space-y-2">
        {recents.slice(0, 5).map((recent, i) => {
          const prompt = getPromptById(recent.modeId);
          return (
            <button
              key={recent.id}
              onClick={() => onRecentSelect(recent)}
              className="card p-3 text-left hover:border-signal transition-colors group flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="shrink-0 text-signal" aria-hidden="true">
                  <NavIcon name="edit" className="w-4 h-4" />
                </span>
                <div className="min-w-0">
                  <div className="font-display font-semibold text-sm text-ink-hi truncate group-hover:text-signal transition-colors">
                    {prompt?.title || recent.title}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-ink-faint">
                    <span className="font-mono">{recent.variables.subject || "—"}</span>
                    {recent.variables.module && (
                      <>
                        <span>·</span>
                        <span>{recent.variables.module}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <span className="font-mono text-[11px] text-signal shrink-0">Open</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}