"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MOBILE_NAV } from "./navItems";
import { NavIcon, isActive } from "./navItems";
import type { NavItem } from "./navItems";

function MobileNavItem({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const active = isActive(item, pathname);

  const cls = `flex flex-col items-center justify-center gap-1 py-2.5 transition-colors ${
    active ? "text-signal" : "text-ink-lo hover:text-ink-hi"
  }`;

  if (item.onClick) {
    return (
      <button
        type="button"
        onClick={item.onClick}
        className={cls}
        aria-label={item.label}
      >
        <NavIcon name={item.icon} className="w-6 h-6" />
        <span className="font-mono text-[10px] uppercase tracking-wide">{item.label}</span>
      </button>
    );
  }

  if (!item.href) return null;

  return (
    <Link href={item.href} className={cls} aria-label={item.label}>
      <NavIcon name={item.icon} className="w-6 h-6" />
      <span className="font-mono text-[10px] uppercase tracking-wide">{item.label}</span>
    </Link>
  );
}

export default function MobileNavigation() {
  const pathname = usePathname();

  if (pathname.startsWith("/night-before") || pathname.includes("/mastery")) return null;

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-bg border-t border-bg-border"
      aria-label="Mobile bottom navigation"
    >
      <div className="grid grid-cols-5">
        {MOBILE_NAV.map((item) => (
          <MobileNavItem key={item.label} item={item} />
        ))}
      </div>
    </nav>
  );
}