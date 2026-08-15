"use client";

import { useState, useCallback } from "react";
import { LearnTopic, LearnSubject } from "@/lib/learn-cs/types";
import {
  AI_LEVELS,
  AI_GOALS,
  AI_STYLES,
  AiLevel,
  AiGoal,
  AiStyle,
  generateLearnAiPrompt,
} from "@/lib/learn-cs/ai";
import { copyToClipboard } from "@/lib/prompts/utils";

function ChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string; description: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="space-y-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">{label}</span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              title={opt.description}
              onClick={() => onChange(opt.value)}
              className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-card border text-left transition-colors ${
                active
                  ? "border-signal text-signal bg-signal/10"
                  : "border-bg-border text-ink-lo hover:text-ink-hi hover:border-signal/40"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function LearnWithAI({ subject, topic }: { subject: LearnSubject; topic: LearnTopic }) {
  const [level, setLevel] = useState<AiLevel>("beginner");
  const [goal, setGoal] = useState<AiGoal>("understand");
  const [style, setStyle] = useState<AiStyle>("simple");
  const [copied, setCopied] = useState(false);

  const prompt = generateLearnAiPrompt(subject, topic, { level, goal, style });

  const handleCopy = useCallback(async () => {
    const ok = await copyToClipboard(prompt);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [prompt]);

  return (
    <div className="card p-5 space-y-5">
      <div className="space-y-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal">Learn with AI</span>
        <h3 className="font-display font-semibold text-ink-hi text-lg">Generate a study prompt for this topic</h3>
        <p className="text-xs text-ink-lo leading-relaxed">
          Pick your level, goal and learning style. We build a copy-ready prompt — paste it into ChatGPT, Gemini or Claude.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ChipGroup label="Level" options={AI_LEVELS} value={level} onChange={setLevel} />
        <ChipGroup label="Goal" options={AI_GOALS} value={goal} onChange={setGoal} />
        <ChipGroup label="Learning style" options={AI_STYLES} value={style} onChange={setStyle} />
      </div>

      <div className="bg-bg-raised/60 border border-bg-border rounded-card p-3.5 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-faint">Generated prompt</span>
          <button
            type="button"
            onClick={handleCopy}
            disabled={copied}
            className={`font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-card border transition-colors disabled:cursor-default ${
              copied ? "border-signal text-signal bg-signal/10" : "border-signal text-signal hover:bg-signal/10"
            }`}
          >
            {copied ? "Copied ✓" : "Copy Prompt"}
          </button>
        </div>
        <pre className="text-[11px] font-mono text-ink-lo leading-relaxed whitespace-pre-wrap scroll-x max-h-64">
          {prompt}
        </pre>
      </div>
    </div>
  );
}