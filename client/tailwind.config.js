/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#ef4464",
        darkMain: "#b81c3d",
        background: "#fafafa",
        black2: "#1d1a21",
        blue2: "#0C60DC",
        green1: "#00C1A2",
        yellow1: "#F4AD41",
      },
    },
  },
  plugins: [],
  extend: {
    animation: {
      marquee: "marquee 25s linear infinite",
    },
    keyframes: {
      marquee: {
        "0%": { transform: "translateX(0%)" },
        "100%": { transform: "translateX(-100%)" },
      },
    },
  },
};
