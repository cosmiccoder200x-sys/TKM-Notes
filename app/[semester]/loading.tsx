export default function SemesterLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 animate-pulse">
      {/* Breadcrumb */}
      <div className="flex gap-2 mb-5">
        <div className="h-3 w-16 bg-bg-surface rounded" />
        <div className="h-3 w-2 bg-bg-surface rounded" />
        <div className="h-3 w-8 bg-bg-surface rounded" />
      </div>

      {/* Semester tabs */}
      <div className="flex gap-2 mb-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-7 w-12 bg-bg-surface rounded-card" />
        ))}
      </div>

      {/* Semester label */}
      <div className="h-5 w-32 bg-bg-surface rounded-card mb-4" />

      {/* Subject cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-32 bg-bg-surface rounded-card" />
        ))}
      </div>
    </div>
  );
}
