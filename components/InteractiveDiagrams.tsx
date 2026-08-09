"use client";

import { useState } from "react";

function Slider({
  label, value, min, max, step, unit, onChange,
}: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="font-mono text-ink-lo w-8 shrink-0">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="flex-1 accent-signal"
      />
      <span className="font-mono text-signal w-16 shrink-0 text-right">{value}{unit}</span>
    </div>
  );
}

export function InteractiveResonance() {
  const [R, setR] = useState(10);   // ohms
  const [L, setL] = useState(50);   // mH
  const [C, setC] = useState(1);    // µF

  const Lh = L / 1000;
  const Cf = C / 1e6;
  const f0 = 1 / (2 * Math.PI * Math.sqrt(Lh * Cf));
  const Q = (1 / R) * Math.sqrt(Lh / Cf);
  const BW = f0 / Q;

  const points: [number, number][] = [];
  const fMin = f0 * 0.2;
  const fMax = f0 * 3;
  const N = 60;
  for (let i = 0; i <= N; i++) {
    const f = fMin + ((fMax - fMin) * i) / N;
    const ratio = f / f0 - f0 / f;
    const I = 1 / Math.sqrt(1 + Q * Q * ratio * ratio); // normalized current, 0..1
    const x = 20 + (260 * i) / N;
    const y = 130 - I * 110;
    points.push([x, y]);
  }
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

  return (
    <div>
      <svg viewBox="0 0 300 150" className="w-full h-auto mb-3">
        <line x1="20" y1="130" x2="280" y2="130" stroke="#232A35" />
        <line x1="20" y1="130" x2="20" y2="10" stroke="#232A35" />
        <path d={path} stroke="#4FD1C5" strokeWidth="2" fill="none" />
        <text x="270" y="144" fill="#8A93A1" fontSize="8" textAnchor="end">f</text>
        <text x="6" y="16" fill="#8A93A1" fontSize="8">I</text>
      </svg>
      <div className="flex flex-col gap-2 mb-3">
        <Slider label="R" value={R} min={2} max={50} step={1} unit="Ω" onChange={setR} />
        <Slider label="L" value={L} min={10} max={200} step={5} unit="mH" onChange={setL} />
        <Slider label="C" value={C} min={0.1} max={5} step={0.1} unit="µF" onChange={setC} />
      </div>
      <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
        <div className="bg-bg-raised border border-bg-border rounded-card p-2 text-center">
          <div className="text-ink-faint">f₀</div>
          <div className="text-signal">{f0.toFixed(0)} Hz</div>
        </div>
        <div className="bg-bg-raised border border-bg-border rounded-card p-2 text-center">
          <div className="text-ink-faint">Q</div>
          <div className="text-weight">{Q.toFixed(2)}</div>
        </div>
        <div className="bg-bg-raised border border-bg-border rounded-card p-2 text-center">
          <div className="text-ink-faint">BW</div>
          <div className="text-critical">{BW.toFixed(0)} Hz</div>
        </div>
      </div>
      <p className="text-xs text-ink-lo leading-relaxed mt-2">
        Drag R down — watch the peak get taller and narrower (higher Q, smaller bandwidth). That&apos;s the whole &quot;Q vs bandwidth tradeoff&quot; in one motion.
      </p>
    </div>
  );
}

export function InteractiveRlStep() {
  const [R, setR] = useState(5);  // ohms
  const [L, setL] = useState(2);  // henries
  const V = 10;

  const tau = L / R;
  const tMax = tau * 5;
  const points: [number, number][] = [];
  const N = 60;
  for (let i = 0; i <= N; i++) {
    const t = (tMax * i) / N;
    const iVal = (V / R) * (1 - Math.exp(-t / tau));
    const x = 20 + (260 * i) / N;
    const y = 130 - (iVal / (V / R)) * 110;
    points.push([x, y]);
  }
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const tauX = 20 + 260 * (tau / tMax);

  return (
    <div>
      <svg viewBox="0 0 300 150" className="w-full h-auto mb-3">
        <line x1="20" y1="130" x2="280" y2="130" stroke="#232A35" />
        <line x1="20" y1="130" x2="20" y2="10" stroke="#232A35" />
        <line x1="20" y1="20" x2="280" y2="20" stroke="#5A6372" strokeDasharray="3 3" />
        <text x="282" y="24" fill="#5A6372" fontSize="7">V/R</text>
        <path d={path} stroke="#4FD1C5" strokeWidth="2" fill="none" />
        <line x1={tauX} y1="20" x2={tauX} y2="130" stroke="#F5B544" strokeDasharray="3 3" />
        <text x={tauX} y="144" fill="#F5B544" fontSize="8" textAnchor="middle">τ</text>
        <text x="270" y="144" fill="#8A93A1" fontSize="8" textAnchor="end">t</text>
      </svg>
      <div className="flex flex-col gap-2 mb-3">
        <Slider label="R" value={R} min={1} max={20} step={1} unit="Ω" onChange={setR} />
        <Slider label="L" value={L} min={0.5} max={10} step={0.5} unit="H" onChange={setL} />
      </div>
      <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
        <div className="bg-bg-raised border border-bg-border rounded-card p-2 text-center">
          <div className="text-ink-faint">τ = L/R</div>
          <div className="text-weight">{tau.toFixed(2)} s</div>
        </div>
        <div className="bg-bg-raised border border-bg-border rounded-card p-2 text-center">
          <div className="text-ink-faint">final current</div>
          <div className="text-signal">{(V / R).toFixed(2)} A</div>
        </div>
      </div>
      <p className="text-xs text-ink-lo leading-relaxed mt-2">
        Drag L up — the rise slows down (bigger τ). Drag R up — it both speeds up AND settles lower (smaller final V/R). Two sliders, one curve, no memorizing needed.
      </p>
    </div>
  );
}

const interactiveRegistry: Record<string, () => JSX.Element> = {
  "interactive-resonance": InteractiveResonance,
  "interactive-rl-step": InteractiveRlStep,
};

export default interactiveRegistry;
