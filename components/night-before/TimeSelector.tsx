"use client";

const PRESETS = [
  { minutes: 30, label: "30 min" },
  { minutes: 60, label: "1 hour" },
  { minutes: 120, label: "2 hours" },
  { minutes: 180, label: "3 hours" },
];

export default function TimeSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (minutes: number) => void;
}) {
  const isCustom = !PRESETS.some((p) => p.minutes === value);

  return (
    <div className="space-y-2">
      <label className="block text-xs font-mono uppercase tracking-wide text-ink-lo" id="time-label">
        Time available
      </label>
      <div className="flex flex-wrap gap-1.5" role="group" aria-labelledby="time-label">
        {PRESETS.map((p) => (
          <button
            key={p.minutes}
            onClick={() => onChange(p.minutes)}
            className={`font-mono text-xs px-3.5 py-2 rounded-card border transition-colors ${
              value === p.minutes
                ? "border-signal text-signal bg-signal/10"
                : "border-bg-border text-ink-lo hover:text-ink-hi hover:border-signal-dim"
            }`}
            aria-pressed={value === p.minutes}
          >
            {p.label}
          </button>
        ))}
        <button
          onClick={() => onChange(240)}
          className={`font-mono text-xs px-3.5 py-2 rounded-card border transition-colors ${
            isCustom
              ? "border-signal text-signal bg-signal/10"
              : "border-bg-border text-ink-lo hover:text-ink-hi hover:border-signal-dim"
          }`}
          aria-pressed={isCustom}
        >
          Custom
        </button>
      </div>
      {isCustom && (
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={30}
            step={15}
            value={value}
            onChange={(e) => onChange(Math.max(30, Number(e.target.value) || 30))}
            className="w-24 bg-bg-surface border border-bg-border rounded-card px-3 py-2 text-sm text-ink-hi focus:border-signal outline-none"
            aria-label="Custom minutes"
          />
          <span className="text-xs font-mono text-ink-lo">minutes</span>
        </div>
      )}
    </div>
  );
}
