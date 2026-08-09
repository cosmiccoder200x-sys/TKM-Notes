import type { Metadata, Viewport } from "next";
import "./globals.css";
import CommandPalette from "@/components/CommandPalette";
import MobileNav from "@/components/MobileNav";

export const metadata: Metadata = {
  title: {
    default: "TKM Notes — Electrical & Computer Engineering · S3–S8",
    template: "%s — TKM Notes",
  },
  description:
    "Exam-focused study workspace for Electrical & Computer Engineering at TKM College of Engineering. S3–S8 notes, PYQs, revision tools and AI-powered study modes.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-ink-hi font-body antialiased min-h-screen pb-16 md:pb-0">
        {children}
        <footer className="max-w-6xl mx-auto px-4 py-8 text-center">
          <a
            href="https://github.com/cosmiccoder200x-sys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono text-ink-faint hover:text-signal transition-colors"
          >
            Made by cosmiccoder200x-sys
          </a>
        </footer>
        <CommandPalette />
        <MobileNav />
      </body>
    </html>
  );
}
