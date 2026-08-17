"use client";

import { semesters, subjects } from "@/lib/content";
import { hasAnyContent } from "@/lib/study";
import { NightBeforeConfig, NightBeforeTarget } from "@/lib/study";
import { ProgramId } from "@/lib/types";
import { PROGRAM_OPTIONS } from "@/lib/branch";
import TimeSelector from "./TimeSelector";

const TARGETS: { id: NightBeforeTarget; label: string }[] = [
  { id: "pass", label: "Pass" },
  { id: "70", label: "70%" },
  { id: "80", label: "80%" },
  { id: "90", label: "90%" },
  { id: "full", label: "Full marks" },
];

export default function NightBeforeSetup({
  initialSubject,
  programId,
  config,
  onChangeConfig,
  onSubjectChange,
  onProgramChange,
  onBuild,
}: {
  initialSubject: string;
  programId: ProgramId;
  config: NightBeforeConfig;
  onChangeConfig: (c: NightBeforeConfig) => void;
  onSubjectChange: (code: string) => void;
  onProgramChange: (id: ProgramId) => void;
  onBuild: () => void;
}) {
  const withNotes = subjects.filter((s) => s.programId === programId && hasAnyContent(s.code, programId));
  const groups = semesters
    .map((sem) => ({ semester: sem, list: withNotes.filter((s) => s.semesterId === sem.id) }))
    .filter((g) => g.list.length > 0);

  return (
    <div className="space-y-6">
      <div>
        <div className="eyebrow mb-1">last-minute mode</div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink-hi leading-tight tracking-tight">
          Last-Minute Mode
        </h1>
        <p className="text-sm text-ink-lo leading-relaxed mt-1.5 max-w-xl">
          High-value revision when time is limited. Pick a subject and how long you have —
          we&apos;ll build a focused plan from the existing notes.
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="nb-program" className="block text-xs font-mono uppercase tracking-wide text-ink-lo">
          Program
        </label>
        <select
          id="nb-program"
          value={programId}
          onChange={(e) => onProgramChange(e.target.value as ProgramId)}
          className="w-full bg-bg-surface border border-bg-border rounded-md px-3 py-2.5 text-sm text-ink-hi focus:border-signal outline-none"
        >
          {PROGRAM_OPTIONS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="nb-subject" className="block text-xs font-mono uppercase tracking-wide text-ink-lo">
          Choose your subject
        </label>
        <select
          id="nb-subject"
          value={initialSubject}
          onChange={(e) => onSubjectChange(e.target.value)}
          className="w-full bg-bg-surface border border-bg-border rounded-md px-3 py-2.5 text-sm text-ink-hi focus:border-signal outline-none"
        >
          {withNotes.length === 0 && <option value="">No subjects with notes yet</option>}
          {groups.map((g) => (
            <optgroup key={g.semester.id} label={g.semester.label}>
              {g.list.map((s) => (
                <option key={`${programId}-${s.code}`} value={s.code}>
                  {s.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <TimeSelector
        value={config.minutes}
        onChange={(minutes) => onChangeConfig({ ...config, minutes })}
      />

      <div className="space-y-2">
        <span className="block text-xs font-mono uppercase tracking-wide text-ink-lo">Target</span>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Target score">
          {TARGETS.map((t) => (
            <button
              key={t.id}
              onClick={() => onChangeConfig({ ...config, target: t.id })}
              className={`font-mono text-xs px-3.5 py-2 rounded-card border transition-colors ${
                config.target === t.id
                  ? "border-signal text-signal bg-signal/10"
                  : "border-bg-border text-ink-lo hover:text-ink-hi hover:border-signal-dim"
              }`}
              aria-pressed={config.target === t.id}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onBuild}
        disabled={!initialSubject}
        className="w-full text-center font-mono text-sm uppercase tracking-wide py-3 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Build My Revision Plan
      </button>
    </div>
  );
}
