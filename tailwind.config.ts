import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter","sans-serif"], mono: ["JetBrains Mono","monospace"] },
      colors: {
        ink: "#111111", muted: "#6b7280", faint: "#f9fafb",
        border: "#e5e7eb", "border-strong": "#d1d5db",
      },
      animation: {
        "slide-up": "slide-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
      },
      keyframes: {
        "slide-up": { from:{ opacity:"0", transform:"translateY(24px)" }, to:{ opacity:"1", transform:"translateY(0)" } },
      },
    },
  },
  plugins: [],
};
export default config;
