"use client";

// Minimal dependency-free SVG line chart for typing progress.

interface LineChartProps {
  data: number[];
  height?: number;
  colorClass?: string;
  unit?: string;
}

export default function LineChart({
  data,
  height = 120,
  colorClass = "stroke-signal",
  unit = "",
}: LineChartProps) {
  if (data.length === 0) {
    return (
      <div className="text-sm text-ink-faint py-6 text-center">
        No data yet.
      </div>
    );
  }

  const width = 600;
  const pad = 8;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const stepX = data.length > 1 ? (width - pad * 2) / (data.length - 1) : 0;
  const points = data.map((v, i) => {
    const x = data.length > 1 ? pad + i * stepX : width / 2;
    const y = height - pad - ((v - min) / range) * (height - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const last = data[data.length - 1];

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" role="img" aria-label="Progress chart">
        <polyline
          points={points.join(" ")}
          fill="none"
          className={`${colorClass} stroke-[2]`}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx={points[points.length - 1].split(",")[0]}
          cy={points[points.length - 1].split(",")[1]}
          r="3"
          className={`fill-current ${colorClass}`}
        />
      </svg>
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-ink-faint mt-1">
        <span>start</span>
        <span className="text-ink-hi">
          {last}
          {unit}
        </span>
        <span>now</span>
      </div>
    </div>
  );
}
