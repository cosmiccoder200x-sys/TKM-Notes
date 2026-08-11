export default function MasteryBar({ value, className = "" }: { value: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      className={`progress-bar ${className}`}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Estimated mastery ${pct}%`}
    >
      <span className="progress-signal" style={{ width: `${pct}%` }} />
    </div>
  );
}
