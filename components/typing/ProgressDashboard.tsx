"use client";

import { useEffect, useState } from "react";
import { loadResults } from "@/lib/typing/storage";
import { summarizeResults, formatDuration } from "@/lib/typing/engine";
import LineChart from "./TypingCharts";
import WeakKeys from "./WeakKeys";
import { TypingResult } from "@/lib/typing/types";

interface ProgressDashboardProps {
  onPractice: (chars: string[]) => void;
}

export default function ProgressDashboard({ onPractice }: ProgressDashboardProps) {
  const [results, setResults] = useState<TypingResult[]>([]);

  useEffect(() => {
    setResults(loadResults());
  }, []);

  const summary = summarizeResults(results);
  const sorted = [...results].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  const wpmSeries = sorted.map((r) => r.wpm);
  const accSeries = sorted.map((r) => r.accuracy);
  const currentWpm = sorted.length > 0 ? sorted[sorted.length - 1].wpm : 0;

  const stats = [
    { label: "Current WPM", value: currentWpm },
    { label: "Best WPM", value: summary.bestWpm },
    { label: "Average WPM", value: summary.averageWpm },
    { label: "Accuracy", value: `${summary.averageAccuracy}%` },
    { label: "Tests completed", value: summary.tests },
    { label: "Total practice time", value: formatDuration(summary.totalSeconds) },
  ];

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl text-ink-hi">Your Typing Progress</h1>
        <p className="text-sm text-ink-lo mt-1">Every test is stored locally on this device.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="card px-4 py-4">
            <div className="font-display font-semibold text-2xl text-ink-hi">{s.value}</div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-ink-faint mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="card px-5 py-4">
          <div className="eyebrow mb-3">WPM over time</div>
          <LineChart data={wpmSeries} colorClass="stroke-signal" unit=" wpm" />
        </div>
        <div className="card px-5 py-4">
          <div className="eyebrow mb-3">Accuracy over time</div>
          <LineChart data={accSeries} colorClass="stroke-signal-dim" unit="%" />
        </div>
      </div>

      <WeakKeys onPractice={onPractice} />
    </main>
  );
}
