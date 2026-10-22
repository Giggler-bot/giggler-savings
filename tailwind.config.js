
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/features/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        forest: "#153D2E",
        ivory: "#F6F5EF",
        lime: "#C4F06A",
        sage: "#DDE9E0",
        ink: "#24332B",
        muted: "#64746A",
        border: "#E7E9E2",
        success: "#26734D",
        warning: "#A96516",
        error: "#B42318",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      borderRadius: {
        card: "24px",
        balance: "22px",
        goal: "18px",
      },
    },
  },
  plugins: [],
};
