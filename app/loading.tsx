export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-10 animate-pulse">
      {/* Hero skeleton */}
      <div className="space-y-3">
        <div className="h-3 w-24 bg-bg-surface rounded-card" />
        <div className="h-8 w-72 bg-bg-surface rounded-card" />
        <div className="h-4 w-96 bg-bg-surface rounded-card" />
        <div className="flex gap-2">
          <div className="h-9 w-36 bg-bg-surface rounded-card" />
          <div className="h-9 w-32 bg-bg-surface rounded-card" />
        </div>
        <div className="h-10 w-full max-w-xl bg-bg-surface rounded-card" />
      </div>

      {/* Current semester skeleton */}
      <div className="space-y-4">
        <div className="h-3 w-28 bg-bg-surface rounded-card" />
        <div className="flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-7 w-12 bg-bg-surface rounded-card" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-32 bg-bg-surface rounded-card" />
          ))}
        </div>
      </div>

      {/* Study tools skeleton */}
      <div className="space-y-4">
        <div className="h-4 w-24 bg-bg-surface rounded-card" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-bg-surface rounded-card" />
          ))}
        </div>
      </div>
    </div>
  );
}
