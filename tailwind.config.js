/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        Sen: ["Sen"],
      },
      colors: {
        primary: "#352F44",
        secondary: "#B9B4C7",
        textPrimary: "#FAF0E6",
        textSecondary: "#e1d8cf",
        tableSecondary: "#5d5869",
      },
    },
  },
  plugins: [],
};
