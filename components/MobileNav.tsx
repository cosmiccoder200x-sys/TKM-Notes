"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/s3", label: "Subjects", icon: "▤" },
  { href: "/prompt-lab", label: "Prompt Lab", icon: "⚡" },
];

export default function MobileNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-bg/95 backdrop-blur border-t border-bg-border"
      aria-label="Mobile bottom navigation"
    >
      <div className="grid grid-cols-4">
        {ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 py-2.5 ${
              isActive(item.href) ? "text-signal" : "text-ink-lo"
            }`}
          >
            <span className="text-base leading-none" aria-hidden>
              {item.icon}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wide">{item.label}</span>
          </Link>
        ))}
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("tkm:open-palette"))}
          className="flex flex-col items-center justify-center gap-1 py-2.5 text-ink-lo"
          aria-label="Search"
        >
          <span className="text-base leading-none" aria-hidden>
            ⌕
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wide">Search</span>
        </button>
      </div>
    </nav>
  );
}
