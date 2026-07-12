import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // "Executive Navy" — deep navy background, steel-blue accent,
        // slate secondary. Reads as professional/corporate, not playful.
        ink: "#0B1220",
        ink2: "#111A2E",
        paper: "#F7F9FC",
        ember: "#2E5AAC",
        ember2: "#4C7BD9",
        plum: "#64748B",
        accent: "#2E5AAC",
        accent2: "#64748B",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(ellipse at top, rgba(46,90,172,0.14), transparent 60%)",
      },
    },
  },
  plugins: [],
};
export default config;
