"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PROGRAM_OPTIONS, normalizeProgramId, BRANCH_LABELS } from "@/lib/branch";
import { ProgramId } from "@/lib/types";
import { programUrl } from "@/lib/urls";

const STORAGE_KEY = "tkm_program_id";

const BRANCH_DESCRIPTIONS: Record<ProgramId, string> = {
  ER: "Electrical & Computer Engineering — the flagship branch with full exam notes.",
  CS: "Computer Science — dedicated CS syllabus with curated subject list.",
  CS_AI: "Computer Science with AI — CS-AI scheme subjects and electives.",
};

export default function BranchPicker() {
  const router = useRouter();
  const [active, setActive] = useState<ProgramId>("ER");

  useEffect(() => {
    const stored = normalizeProgramId(localStorage.getItem(STORAGE_KEY));
    if (stored) setActive(stored);
  }, []);

  function choose(id: ProgramId) {
    setActive(id);
    localStorage.setItem(STORAGE_KEY, id);
    router.push(programUrl(id));
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {PROGRAM_OPTIONS.map((p) => {
        const isActive = active === p.id;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => choose(p.id)}
            className={`card p-5 text-left flex flex-col gap-2 transition-all hover:border-signal/50 group ${
              isActive ? "border-signal/60 bg-signal/5" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-lo group-hover:text-signal transition-colors">
                {p.id}
              </span>
              {isActive && (
                <span className="font-mono text-[10px] uppercase tracking-wider text-signal">
                  Current
                </span>
              )}
            </div>
            <span className="font-display font-bold text-sm text-ink-hi group-hover:text-signal transition-colors">
              {BRANCH_LABELS[p.id]}
            </span>
            <span className="text-xs text-ink-lo leading-relaxed font-light">
              {BRANCH_DESCRIPTIONS[p.id]}
            </span>
            <span className="font-mono text-[11px] text-signal mt-1">Open {p.id} →</span>
          </button>
        );
      })}
    </div>
  );
}
