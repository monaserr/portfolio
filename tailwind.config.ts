import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        mono:    ["var(--font-mono)", "monospace"],
      },
      colors: {
        bg:      "#080808",
        surface: "#111111",
        card:    "#141414",
        border:  "#222222",
        soft:    "#f0ede8",
        cream:   "#e8e4de",
        muted:   "#555555",
        faint:   "#2a2a2a",
      },
      borderRadius: {
        pill: "9999px",
      },
      animation: {
        "slide-up": "slide-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in":  "fade-in 0.5s ease forwards",
      },
      keyframes: {
        "slide-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
