/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#ffffff",
      light_grayish_violet: "#dedddf",
      dark_grayish_violet: "#8e8593",
      very_dark_grayish_violet: "#21092f",
      dang_red: "#ff0e0e",
    },
    lineHeight: {
      mid: "1rem",
    },
    letterSpacing: {
      low: "-0.016rem",
    },
    extend: {},
  },
  plugins: [],
};
