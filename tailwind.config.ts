import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    './src/app/**/*.{js,ts,jsx,tsx}', // Include app directory for pages
    './src/modules/**/*.{js,ts,jsx,tsx}', // Include all modules (shop, news, shared, etc.)
    './src/components/**/*.{js,ts,jsx,tsx}', // If you have a components directory
  ],
  theme: {
    name: "Ocean",
    fontFamily: {
      sans: [
        "Roboto",
        "ui-sans-serif",
        "system-ui",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    extend: {
      fontFamily: {
        title: [
          "Roboto",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        body: [
          "Roboto",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      colors: {
        neutral: {
          50: "#E0F7FA",
          100: "#D9F0F3",
          200: "#D3E8EB",
          300: "#CCE1E4",
          400: "#C5D9DC",
          500: "#BED2D5",
          600: "#5A6364",
          700: "#434A4B",
          800: "#2D3132",
          900: "#161919",
          DEFAULT: "#E0F7FA",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          foreground: "hsl(var(--primary-foreground))",
          DEFAULT: "hsl(var(--primary))",
          50: "#FFFFFF",
          100: "#F7F7F7",
          200: "#F0F0F0",
          300: "#E8E8E8",
          400: "#E0E0E0",
          500: "#D9D9D9",
          600: "#666666",
          700: "#4D4D4D",
          800: "#333333",
          900: "#191919",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
