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
        <CommandPalette />
      </body>
    </html>
  );
}