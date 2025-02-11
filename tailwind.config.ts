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
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
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
        AAsecondary: "#ffba08",
        AAError: "#ff6489",
        ResumeButtonHover: "#153040",
        MobileNavBarColor: "#112340",
        StartupBackground: "#020c1b",
      },
    },
  },
  plugins: [],
} satisfies Config;
