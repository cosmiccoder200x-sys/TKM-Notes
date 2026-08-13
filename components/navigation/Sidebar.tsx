"use client";

import Link from "next/link";
import { PRIMARY_NAV, FOOTER_NAV } from "./navItems";
import SidebarItem from "./SidebarItem";
import ThemeToggle from "@/components/ThemeToggle";
import { PRODUCT_NAME } from "@/lib/branch";

function Logo() {
  return (
    <Link
      href="/"
      className="font-display font-bold text-base tracking-wide text-ink-hi"
      aria-label={PRODUCT_NAME}
    >
      {PRODUCT_NAME}
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside
      className="hidden md:flex flex-col w-60 shrink-0 bg-bg-surface border-r border-bg-border rounded-2xl min-h-0"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="h-16 px-5 flex items-center border-b border-bg-border/40 shrink-0">
        <Logo />
      </div>

      <nav className="flex-1 overflow-y-auto no-scrollbar px-2 py-3 space-y-1" aria-label="Primary">
        {PRIMARY_NAV.map((item) => (
          <SidebarItem key={item.label} item={item} />
        ))}
      </nav>

      <div className="px-2 py-3 border-t border-bg-border/40 space-y-1 shrink-0">
        {FOOTER_NAV.map((item) => (
          <SidebarItem key={item.label} item={item} />
        ))}
        <div className="pt-2 px-1">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}