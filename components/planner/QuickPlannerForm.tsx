"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getSubjectContent } from "@/lib/notes";
import { semesters, subjects } from "@/lib/content";
import { programSlug } from "@/lib/urls";

const MINUTES = [30, 60, 90, 120];

export default function QuickPlannerForm() {
  const router = useRouter();
  const withNotes = useMemo(() => subjects.filter((s) => getSubjectContent(s.code, s.programId)), []);
  const groups = semesters
    .map((sem) => ({ semester: sem, list: withNotes.filter((s) => s.semesterId === sem.id) }))
    .filter((g) => g.list.length > 0);

  const [subject, setSubject] = useState(
    withNotes[0] ? `${withNotes[0].programId}:${withNotes[0].code}` : ""
  );
  const [minutes, setMinutes] = useState(60);

  function go() {
    if (!subject) return;
    const [pid, code] = subject.split(":");
    router.push(`/planner?subject=${encodeURIComponent(code)}&program=${programSlug(pid as "ER" | "CS" | "CS_AI")}&minutes=${minutes}`);
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        aria-label="Subject"
        className="flex-1 min-w-0 bg-bg-surface border border-bg-border rounded-card px-3 py-2.5 text-sm text-ink-hi focus:border-signal outline-none"
      >
        {groups.map((g) => (
          <optgroup key={g.semester.id} label={g.semester.label}>
            {g.list.map((s) => (
              <option key={`${s.programId}:${s.code}`} value={`${s.programId}:${s.code}`}>
                {s.name} ({s.programId})
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      <div className="flex gap-1.5">
        {MINUTES.map((m) => (
          <button
            key={m}
            onClick={() => setMinutes(m)}
            aria-pressed={minutes === m}
            className={`font-mono text-xs px-3 py-2 rounded-card border transition-colors ${
              minutes === m
                ? "border-signal text-signal bg-signal/10"
                : "border-bg-border text-ink-lo hover:text-ink-hi"
            }`}
          >
            {m === 60 ? "1h" : `${m}m`}
          </button>
        ))}
      </div>

      <button
        onClick={go}
        className="font-mono text-xs uppercase tracking-wide px-4 py-2.5 rounded-card bg-signal text-bg font-semibold hover:bg-signal/90 transition-colors"
      >
        Generate My Plan →
      </button>
    </div>
  );
}
