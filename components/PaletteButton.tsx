"use client";

export default function PaletteButton({ label = "Search…", large = false }: { label?: string; large?: boolean }) {
  function open() {
    window.dispatchEvent(new CustomEvent("tkm:open-palette"));
  }

  return (
    <button
      onClick={open}
      className={`w-full flex items-center gap-2.5 bg-bg-surface border border-bg-border rounded-card text-ink-faint hover:border-signal hover:text-ink-lo transition-colors text-left ${
        large ? "px-4 py-3 text-sm" : "px-3 py-2 text-xs"
      }`}
      aria-label="Open search"
    >
      <span aria-hidden>⌕</span>
      <span className="flex-1">{label}</span>
      <kbd className="font-mono text-[10px] text-ink-faint border border-bg-border rounded px-1.5 py-0.5">
        ⌘K
      </kbd>
    </button>
  );
}
