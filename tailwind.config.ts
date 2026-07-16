import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      keyframes: {
        pulseRing: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.7" },
        },
      },
      animation: {
        "pulse-ring": "pulseRing 2.5s ease-in-out infinite",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          navy: "#0a192f",
          navyLight: "#112240",
          navyMuted: "#233554",
          slate: "#8892b0",
          slateLight: "#ccd6f6",
          accent: "#64ffda",
          accentMuted: "#64ffda80",
        },
        "masaud-dev-light-grey": "#d4cfcf",
        "masaud-dev-dark-grey": "#182635",
        "masaud-dev-purple": "#162447",
        "masaud-dev-cyan": "#00FFFF",
        "masaud-dev-teal": "#00ffdc",
        "masaud-dev-dark-teal": "#00FFC2",
        "masaud-dev-pink": "#FF55BB",
        "masaud-dev-yellow": "#FEFF86",
        "masaud-dev-green": "#30C85E",
        "masaud-dev-blue": "#4A97FE",
        "masaud-dev-primary-black": "#181818",
        "masaud-dev-secondary-black": "#1E1E1F",
        "ubuntu-orange": "#E95420",
        AAprimary: "#03071e",
        AAsecondary: "#64ffda",
        AAError: "#ff6489",
        ResumeButtonHover: "#153040",
        MobileNavBarColor: "#112240",
        StartupBackground: "#020c1b",
      },
    },
  },
  plugins: [],
} satisfies Config;
