"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavIcon, isActive } from "./navItems";
import type { NavItem } from "./navItems";

interface SidebarItemProps {
  item: NavItem;
  compact?: boolean;
}

export default function SidebarItem({ item, compact = false }: SidebarItemProps) {
  const pathname = usePathname();
  const active = isActive(item, pathname);

  const baseCls = "flex items-center gap-3 rounded-lg transition-colors";
  const activeCls = "text-signal bg-signal/10";
  const inactiveCls = "text-ink-lo hover:text-ink-hi hover:bg-bg-raised";
  const paddingCls = compact ? "px-3 py-2" : "px-4 py-2.5";
  const cls = `${baseCls} ${paddingCls} ${active ? activeCls : inactiveCls}`;

  const content = (
    <>
      <NavIcon name={item.icon} className="w-5 h-5 shrink-0" />
      <span className="font-display text-sm tracking-wide truncate">{item.label}</span>
    </>
  );

  if (item.onClick) {
    return (
      <button
        type="button"
        onClick={item.onClick}
        className={cls}
        aria-label={item.label}
      >
        {content}
      </button>
    );
  }

  if (!item.href) return null;

  return (
    <Link
      href={item.href}
      className={cls}
      target={item.external ? "_blank" : undefined}
      rel={item.external ? "noopener noreferrer" : undefined}
    >
      {content}
    </Link>
  );
}