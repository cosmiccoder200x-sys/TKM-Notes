"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PROGRAM_OPTIONS, normalizeProgramId } from "@/lib/branch";
import { ProgramId } from "@/lib/types";

const STORAGE_KEY = "tkm_program_id";

export default function BranchSelect() {
  const router = useRouter();
  const [programId, setProgramId] = useState<ProgramId>("ER");

  useEffect(() => {
    const stored = normalizeProgramId(localStorage.getItem(STORAGE_KEY));
    if (stored) setProgramId(stored);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as ProgramId;
    setProgramId(next);
    localStorage.setItem(STORAGE_KEY, next);
    router.push("/s3");
  }

  return (
    <label className="flex items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
        Branch
      </span>
      <select
        value={programId}
        onChange={handleChange}
        aria-label="Select branch"
        className="bg-bg-surface border border-bg-border rounded-lg px-3 py-2 text-sm font-mono text-ink-hi focus:border-signal focus:outline-none appearance-none pr-8 cursor-pointer"
      >
        {PROGRAM_OPTIONS.map((p) => (
          <option key={p.id} value={p.id}>
            {p.short}
          </option>
        ))}
      </select>
    </label>
  );
}
