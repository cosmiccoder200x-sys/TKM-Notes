import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import ThemeScript from "@/components/ThemeScript";
import CommandPalette from "@/components/CommandPalette";
import { PRODUCT_NAME, PRODUCT_TAGLINE } from "@/lib/branch";
import AppShell from "@/components/layout/AppShell";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${PRODUCT_NAME} — Your AI exam preparation system`,
    template: `%s — ${PRODUCT_NAME}`,
  },
  description:
    `${PRODUCT_NAME}: ${PRODUCT_TAGLINE} Study less, prioritize better. Exam-focused notes, AI study planner, revision tools and mastery tracking for Electrical & Computer Engineering at TKM College of Engineering (S3–S8).`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <ThemeScript />
      </head>
      <body className="font-body antialiased min-h-screen pb-16 md:pb-0">
        <AppShell>{children}</AppShell>
        <footer className="max-w-6xl mx-auto px-4 py-8 text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint mb-2">
            {PRODUCT_NAME} · {PRODUCT_TAGLINE}
          </div>
          <a
            href="https://github.com/cosmiccoder200x-sys"
            aria-label="GitHub profile — cosmiccoder200x-sys"
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-ink-faint hover:text-signal transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            Made by cosmiccoder200x-sys
          </a>
        </footer>
        <CommandPalette />
      </body>
    </html>
  );
}