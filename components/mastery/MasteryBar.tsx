export default function MasteryBar({ value, className = "" }: { value: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      className={`h-2 rounded-full bg-bg-border overflow-hidden ${className}`}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Estimated mastery ${pct}%`}
    >
      <div
        className="h-full rounded-full bg-signal transition-[width] duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
