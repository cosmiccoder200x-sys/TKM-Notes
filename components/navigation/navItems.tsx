"use client";

export interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon: string;
  external?: boolean;
}

export function isActive(item: NavItem, pathname: string): boolean {
  if (!item.href) return false;
  const base = item.href.split("?")[0];
  if (base === "/") return pathname === "/";
  return pathname === base || pathname.startsWith(base + "/");
}

export const PRIMARY_NAV = [
  { label: "Library", href: "/", icon: "library" },
  { label: "Learn CS", href: "/learn-cs", icon: "learn" },
  { label: "Subjects", href: "/syllabus/er", icon: "subjects" },
  { label: "Coverage", href: "/coverage", icon: "subjects" },
  { label: "PYQs", href: "/pyqs", icon: "pyq" },
  { label: "Planner", href: "/planner", icon: "planner" },
  { label: "Practice", href: "/prompt-lab", icon: "practice" },
  { label: "Revision", href: "/night-before", icon: "revision" },
  { label: "Typing", href: "/typing", icon: "typing" },
  { label: "Bookmarks", onClick: () => window.dispatchEvent(new CustomEvent("tkm:open-palette")), icon: "bookmark" },
];

export const FOOTER_NAV = [
  { label: "Settings", onClick: () => window.dispatchEvent(new CustomEvent("tkm:open-palette")), icon: "settings" },
];

export const MOBILE_NAV = [
  { label: "Library", href: "/", icon: "library" },
  { label: "Learn CS", href: "/learn-cs", icon: "learn" },
  { label: "Planner", href: "/planner", icon: "planner" },
  { label: "Subjects", href: "/syllabus/er", icon: "subjects" },
  { label: "Practice", href: "/prompt-lab", icon: "practice" },
  { label: "Revision", href: "/night-before", icon: "revision" },
  { label: "Typing", href: "/typing", icon: "typing" },
  { label: "Search", onClick: () => window.dispatchEvent(new CustomEvent("tkm:open-palette")), icon: "search" },
];

// Fixed 5-slot bottom navigation bar on phones.
export const MOBILE_BOTTOM_NAV = [
  { label: "Library", href: "/", icon: "library" },
  { label: "Learn CS", href: "/learn-cs", icon: "learn" },
  { label: "Subjects", href: "/syllabus/er", icon: "subjects" },
  { label: "Practice", href: "/prompt-lab", icon: "practice" },
  { label: "Search", onClick: () => window.dispatchEvent(new CustomEvent("tkm:open-palette")), icon: "search" },
];

export const MOBILE_DRAWER_ITEMS = [
  { href: "/", label: "Library", icon: "library" },
  { href: "/learn-cs", label: "Learn CS", icon: "learn" },
  { href: "/planner", label: "Planner", icon: "planner" },
  { href: "/syllabus/er", label: "Subjects", icon: "subjects" },
  { href: "/coverage", label: "Coverage", icon: "subjects" },
  { href: "/prompt-lab", label: "Practice", icon: "practice" },
  { href: "/night-before", label: "Revision", icon: "revision" },
  { href: "/typing", label: "Typing", icon: "typing" },
];

export function NavIcon({ name, className = "w-[18px] h-[18px]" }: { name: string; className?: string }) {
  const c = className;
  const s = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "library":
      return <svg className={c} viewBox="0 0 24 24" {...s}><path d="M4 20V6a3 3 0 013-3h13v14H7a3 3 0 00-3 3z"/><path d="M4 20h13"/></svg>;
    case "learn":
      return <svg className={c} viewBox="0 0 24 24" {...s}><path d="M22 9l-10-5L2 9l10 5 10-5z"/><path d="M6 11.5V15c0 1.66 2.69 3 6 3s6-1.34 6-3v-3.5"/><path d="M22 9v5"/></svg>;
    case "terminal":
      return <svg className={c} viewBox="0 0 24 24" {...s}><path d="M4 17l6-5-6-5"/><path d="M12 19h8"/></svg>;
    case "database":
      return <svg className={c} viewBox="0 0 24 24" {...s}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/></svg>;
    case "subjects":
      return <svg className={c} viewBox="0 0 24 24" {...s}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>;
    case "pyq":
      return <svg className={c} viewBox="0 0 24 24" {...s}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6"/><path d="M9 17h6"/></svg>;
    case "planner":
      return <svg className={c} viewBox="0 0 24 24" {...s}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>;
    case "practice":
      return <svg className={c} viewBox="0 0 24 24" {...s}><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></svg>;
    case "revision":
      return <svg className={c} viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>;
    case "bookmark":
      return <svg className={c} viewBox="0 0 24 24" {...s}><path d="M6 3h12v18l-6-4-6 4z"/></svg>;
    case "settings":
      return <svg className={c} viewBox="0 0 24 24" {...s}><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>;
    case "search":
      return <svg className={c} viewBox="0 0 24 24" {...s}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>;
    case "typing":
      return <svg className={c} viewBox="0 0 24 24" {...s}><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/></svg>;
    case "chevron-down":
      return <svg className={c} viewBox="0 0 24 24" {...s}><path d="M6 9l6 6 6-6"/></svg>;
    case "edit":
      return <svg className={c} viewBox="0 0 24 24" {...s}><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
    case "sigma":
      return <svg className={c} viewBox="0 0 24 24" {...s}><path d="M18 13c0-3.866-3.134-7-7-7s-7 3.134-7 7 3.134 7 7 7c2.485 0 4.554-1.252 5.828-3.172L7 8l4-4 2.172 2.172C15.748 4.446 17 3.446 17 2c0-.552-.448-1-1-1H6c-.552 0-1 .448-1 1v16c0 .552.448 1 1 1h10c.552 0 1-.448 1-1v-3.586l-2.172 2.172C13.554 19.748 14.5 21 17 21s7-3.134 7-7"/></svg>;
    case "brackets":
      return <svg className={c} viewBox="0 0 24 24" {...s}><path d="M14 3h-4v18h4"/><path d="M8 3h-4v18h4"/></svg>;
    case "network":
      return <svg className={c} viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="2"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12l2 0M20 12l2 0"/></svg>;
    case "sensor":
      return <svg className={c} viewBox="0 0 24 24" {...s}><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>;
    case "chip":
      return <svg className={c} viewBox="0 0 24 24" {...s}><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6M9 12h6M9 15h6"/></svg>;
    case "flask":
      return <svg className={c} viewBox="0 0 24 24" {...s}><path d="M10 2v7.31c-2-.51-4.17 1.04-5 3 1.37 2.72 1.4 5.46.1 7.13v2.64A2 2 0 0012 22h0a2 2 0 002-2V9.96c-1.3-1.67-1.27-4.41.1-7.13C14.17 2.51 12 1 10 2z"/><path d="M8.5 2h7"/></svg>;
    case "book":
      return <svg className={c} viewBox="0 0 24 24" {...s}><path d="M4 19.5v-15A2.5 2.5 0 016.5 2H20v20H6.5a2.5 2.5 0 010-5H20"/></svg>;
    case "modules":
      return <svg className={c} viewBox="0 0 24 24" {...s}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
    case "chevron-right":
      return <svg className={c} viewBox="0 0 24 24" {...s}><path d="M9 18l6-6-6-6"/></svg>;
    default:
      return <svg className={c} viewBox="0 0 24 24" {...s}><circle cx="12" cy="12" r="3"/></svg>;
  }
}