import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        main: "#1f293a",
        border: "#0ef"
      },
      textColor: {
        warning: "#ffef00",
        error: "#ff0303",
        main: "#0ef",
        info_title: "#1f293a",
      },
      dropShadow: {
        'neon': [
          '0 35px 35px rgba(1, 1, 0, 1.0)',
          '0 45px 65px rgba(1, 1, 0, 1.0)',
        ]
      }
    },
  },
  plugins: []
};
export default config;
