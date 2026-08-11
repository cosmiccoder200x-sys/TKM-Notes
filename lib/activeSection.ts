import { useEffect, useState } from "react";

// Tracks which anchored section is currently in view (for sticky TOC highlight).
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!ids.length || typeof IntersectionObserver === "undefined") return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let picked = entries[0]?.target.id;
        // Prefer the section that is most centered.
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0) {
            picked = entry.target.id;
            break;
          }
        }
        // Fallback: pick the first intersecting entry nearest top.
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          picked = intersecting[0].target.id;
        }
        if (picked) setActive(picked);
      },
      { root: null, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, [ids]);

  return active;
}
