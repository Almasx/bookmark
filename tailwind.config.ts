/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#E5FBFF",
          "100": "#BFF4FF",
          "200": "#99ECFF",
          "300": "#73E4FF",
          "400": "#4CDFFF",
          "500": "#26D7FF",
          "600": "#00CFFF",
          "700": "#00BADD",
          "800": "#0098B6",
          "900": "#00738D",
          "950": "#004A59",
        },
      },
      borderRadius: {
        "3xl": "1.25rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Helvetica Neue", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-corner-smoothing"),
  ],
} satisfies Config;
