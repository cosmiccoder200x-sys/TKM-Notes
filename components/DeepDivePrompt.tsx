"use client";

import { useState } from "react";
import Link from "next/link";
import { Subject } from "@/lib/types";
import { buildDeepDivePrompt } from "@/lib/deepDivePrompt";
import { generatePromptLabUrl } from "@/lib/prompts/context";

export default function DeepDivePrompt({ subject }: { subject: Subject }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const prompt = buildDeepDivePrompt(subject);
  
  const promptLabUrl = generatePromptLabUrl({
    subjectCode: subject.code,
    subjectSlug: subject.slug,
    subjectName: subject.name,
  });

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — fall back to manual select
    }
  }

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left"
      >
        <div>
          <div className="eyebrow mb-0.5">ai study prompt</div>
          <div className="text-sm font-display font-semibold text-ink-hi">
            Want to go deeper on this subject?
          </div>
        </div>
        <span className="text-ink-lo text-lg shrink-0">{open ? "–" : "+"}</span>
      </button>

      {open && (
        <div className="px-4 pb-4">
          <p className="text-xs text-ink-lo leading-relaxed mb-3">
            Copy this into Claude (or any AI chat) to get a complete module-by-module deep
            dive — overview, definitions, worked examples, formulas, exam focus, and revision
            notes — built from this subject&apos;s exact official syllabus.
          </p>
          <pre className="bg-bg-raised border border-bg-border rounded-card p-3 text-[11px] text-ink-lo leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto font-mono">
            {prompt}
          </pre>
          <div className="flex gap-2 mt-3">
            <button
              onClick={copyPrompt}
              className={`flex-1 text-center text-sm font-mono py-2 rounded-card border transition-colors ${
                copied
                  ? "border-signal text-signal bg-signal/10"
                  : "border-bg-border text-ink-hi hover:border-signal hover:text-signal"
              }`}
            >
              {copied ? "Copied ✓" : "Copy prompt"}
            </button>
            <Link
              href={promptLabUrl}
              className="flex-1 text-center text-sm font-mono py-2 rounded-card border border-signal text-signal hover:bg-signal/10 transition-colors"
            >
              Open in Prompt Lab
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
