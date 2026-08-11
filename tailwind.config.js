/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "rgb(var(--color-bg))",
          surface: "rgb(var(--color-bg-surface))",
          raised: "rgb(var(--color-bg-raised))",
          border: "rgb(var(--color-border))",
        },
        ink: {
          hi: "rgb(var(--color-ink-hi))",
          lo: "rgb(var(--color-ink-lo))",
          faint: "rgb(var(--color-ink-faint))",
          faintest: "rgb(var(--color-ink-faintest))",
        },
        signal: {
          DEFAULT: "rgb(var(--color-signal))",
          dim: "rgb(var(--color-signal-dim))",
        },
        weight: {
          DEFAULT: "rgb(var(--color-weight))",
          dim: "rgb(var(--color-weight-dim))",
        },
        critical: {
          DEFAULT: "rgb(var(--color-critical))",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.125rem" }],
        sm: ["0.8125rem", { lineHeight: "1.375rem" }],
        base: ["0.9375rem", { lineHeight: "1.625rem" }],   // 15px body
        lg: ["1.0625rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.375rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.75rem" }],
        "5xl": ["3rem", { lineHeight: "3.25rem" }],
        "6xl": ["3.5rem", { lineHeight: "3.75rem" }],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
      },
      boxShadow: {
        card: "0 1px 2px rgb(0 0 0 / 0.03)",
        popover: "0 2px 8px rgb(0 0 0 / 0.06), 0 12px 32px -8px rgb(0 0 0 / 0.12)",
      },
      maxWidth: {
        prose: "68ch",
        narrow: "46rem",
      },
    },
  },
  plugins: [],
};
