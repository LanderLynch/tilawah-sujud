/** Direkonstruksi dari CSS terkompilasi main.f0e97c75.css */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#14305A", 700: "#1D4079", 900: "#0E2243" },
        gold: { DEFAULT: "#C8A04A", 300: "#E0C27E", 600: "#A8822F" },
        sky: { note: "#E4EBF7", ink: "#2F5FA8" },
        slate: { ink: "#5A6478" },
        cream: "#FBF9F4",
        // token shadcn (dipakai ui/dialog.jsx)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        arab: ["Amiri", "serif"],
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        bob: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-4px)" } },
        wiggle: { "0%,100%": { transform: "rotate(0)" }, "25%": { transform: "rotate(-12deg)" }, "75%": { transform: "rotate(12deg)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        "scroll-dot": { "0%": { opacity: "1", transform: "translateY(0)" }, "100%": { opacity: "0", transform: "translateY(14px)" } },
        "spin-slow": { to: { transform: "rotate(1turn)" } },
        shimmer: { "0%": { transform: "translateX(-120%)" }, "100%": { transform: "translateX(120%)" } },
        "pulse-glow": {
          "0%,100%": { filter: "drop-shadow(0 0 4px rgba(200,160,74,.35))", opacity: ".85" },
          "50%": { filter: "drop-shadow(0 0 18px rgba(224,194,126,.9))", opacity: "1" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        bob: "bob 2.4s ease-in-out infinite",
        wiggle: "wiggle 1.2s ease-in-out infinite",
        marquee: "marquee 48s linear infinite",
        "scroll-dot": "scroll-dot 1.6s ease-out infinite",
        "spin-slow": "spin-slow 60s linear infinite",
        shimmer: "shimmer 2.4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3.2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
