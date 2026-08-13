"use client";

import { ReactNode } from "react";

type Tone = "definition" | "keyidea" | "formula" | "tip" | "mistake" | "warning" | "procedure" | "revision";

const TONE: Record<Tone, { border: string; bg: string; icon: string; title: string }> = {
  definition: { border: "border-weight-dim", bg: "bg-weight/5", icon: "■", title: "DEFINITION" },
  keyidea: { border: "border-signal-dim", bg: "bg-signal/5", icon: "◇", title: "KEY IDEA" },
  formula: { border: "border-bg-border", bg: "bg-bg", icon: "ƒ", title: "FORMULA" },
  tip: { border: "border-weight-dim", bg: "bg-weight/5", icon: "ⓘ", title: "EXAM TIP" },
  mistake: { border: "border-critical/40", bg: "bg-critical/5", icon: "✕", title: "COMMON MISTAKE" },
  warning: { border: "border-critical/40", bg: "bg-critical/5", icon: "▲", title: "CAREFUL" },
  procedure: { border: "border-signal-dim", bg: "bg-signal/5", icon: "#", title: "STANDARD METHOD" },
  revision: { border: "border-bg-border", bg: "bg-bg", icon: "•", title: "QUICK REVISION" },
};

export function NoteCard({
  tone = "keyidea",
  title,
  children,
  className = "",
}: {
  tone?: Tone;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  const t = TONE[tone];
  return (
    <div className={`border rounded-card p-4 ${t.border} ${t.bg} ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-signal text-xs" aria-hidden>
          {t.icon}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wide text-signal">
          {title ?? t.title}
        </span>
      </div>
      <div className="text-sm text-ink-hi leading-relaxed">{children}</div>
    </div>
  );
}

export function DefinitionBox({
  term,
  definition,
}: {
  term: string;
  definition: string;
}) {
  return (
    <NoteCard tone="definition" title={term}>
      {definition}
    </NoteCard>
  );
}

export function FormulaCard({
  name,
  expression,
  note,
}: {
  name: string;
  expression: string;
  note?: string;
}) {
  return (
    <NoteCard tone="formula" title={name}>
      <div className="font-mono text-[14px] text-signal leading-relaxed break-words select-all">
        {expression}
      </div>
      {note && <p className="text-xs text-ink-lo mt-1 leading-relaxed">{note}</p>}
    </NoteCard>
  );
}
