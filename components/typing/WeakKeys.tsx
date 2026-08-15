"use client";

import { useEffect, useState } from "react";
import { weakKeysFromStats } from "@/lib/typing/engine";
import { loadResults } from "@/lib/typing/storage";
import { CharStat, WeakKey } from "@/lib/typing/types";

interface WeakKeysProps {
  onPractice: (chars: string[]) => void;
}

export default function WeakKeys({ onPractice }: WeakKeysProps) {
  const [keys, setKeys] = useState<WeakKey[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const results = loadResults();
    const allStats: CharStat[][] = results.map((r) => r.charStats);
    setKeys(weakKeysFromStats(allStats).filter((k) => k.errorRate > 0));
    setLoaded(true);
  }, []);

  if (!loaded) return null;
  if (keys.length === 0) {
    return (
      <div className="card px-5 py-4 text-sm text-ink-lo">
        No weak keys yet. Complete a few typing tests and your most error-prone
        characters will show up here.
      </div>
    );
  }

  const top = keys.slice(0, 5);
  const practiceChars = top.slice(0, 3).map((k) => k.char);

  return (
    <div>
      <div className="eyebrow mb-3">Weak keys</div>
      <div className="card px-5 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {top.map((k) => (
            <div key={k.char} className="text-center">
              <div className="font-mono text-xl text-critical">
                {k.char === " " ? "␣" : k.char}
              </div>
              <div className="font-mono text-[10px] text-ink-faint mt-1">
                {k.errorRate}% error
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-ink-lo mt-4">
          Practice sentences containing{" "}
          <span className="text-ink-hi">
            {practiceChars.map((c) => (c === " " ? "space" : `"${c}"`)).join(" and ")}
          </span>
          .
        </p>
        <button
          type="button"
          onClick={() => onPractice(practiceChars)}
          className="mt-3 font-mono text-[11px] uppercase tracking-wider px-4 py-2 rounded-md border border-signal text-signal hover:bg-signal/10 transition-colors"
        >
          Practice Weak Keys
        </button>
      </div>
    </div>
  );
}
