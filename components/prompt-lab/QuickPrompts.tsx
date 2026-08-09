"use client";

import { QUICK_PROMPTS } from "@/lib/prompts/utils";
import { StudyModeId } from "@/lib/prompts/types";

interface QuickPromptsProps {
  onQuickSelect: (modeId: StudyModeId, defaultVars?: Record<string, string>) => void;
}

export default function QuickPrompts({ onQuickSelect }: QuickPromptsProps) {
  return (
    <div className="space-y-3">
      <h4 className="font-display font-semibold text-ink-hi">Quick Start</h4>
      <p className="text-xs text-ink-lo leading-relaxed">
        Common tasks — opens the prompt with sensible defaults.
      </p>
      <div className="grid grid-cols-2 gap-2">
        {QUICK_PROMPTS.map((quick, i) => (
          <button
            key={i}
            onClick={() => onQuickSelect(quick.modeId, quick.defaultVars)}
            className="card p-3 text-left hover:border-signal transition-colors group"
          >
            <div className="font-mono text-[11px] text-signal mb-1">{quick.label}</div>
            <div className="text-xs text-ink-lo leading-relaxed">Tap to open</div>
          </button>
        ))}
      </div>
    </div>
  );
}