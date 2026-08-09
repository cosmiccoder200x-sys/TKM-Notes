export default function SubjectLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 animate-pulse">
      {/* Breadcrumb */}
      <div className="flex gap-2">
        <div className="h-3 w-16 bg-bg-surface rounded" />
        <div className="h-3 w-2 bg-bg-surface rounded" />
        <div className="h-3 w-6 bg-bg-surface rounded" />
        <div className="h-3 w-2 bg-bg-surface rounded" />
        <div className="h-3 w-20 bg-bg-surface rounded" />
      </div>

      {/* Subject header */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="h-5 w-20 bg-bg-surface rounded-card" />
          <div className="h-5 w-28 bg-bg-surface rounded-card" />
        </div>
        <div className="h-8 w-80 bg-bg-surface rounded-card" />
        <div className="h-4 w-48 bg-bg-surface rounded-card" />
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 bg-bg-surface rounded-card" />
        ))}
      </div>

      {/* Module list */}
      <div className="space-y-4">
        <div className="h-5 w-20 bg-bg-surface rounded-card" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-48 bg-bg-surface rounded-card" />
        ))}
      </div>
    </div>
  );
}
