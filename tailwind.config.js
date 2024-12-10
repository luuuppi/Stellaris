/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#0E0E0E",
          900: "#1E1E1E",
          800: "#2F2F2F",
          700: "#414141",
          600: "#525252",
          500: "#636363",
          400: "#757575",
          300: "#868686",
          200: "#979797",
          100: "#A8A8A8",
          50: "#EEEEEE",
        },
        accent: {
          950: "#0E215A",
          900: "#142E7E",
          800: "#193BA2",
          700: "#1F49C6",
          600: "#2F5BDF",
          500: "#4169E1",
          400: "#5C7FE6",
          300: "#7894EA",
          200: "#93A9EE",
          100: "#AEBFF2",
          50: "#F1F4FD",
        },
      },
      keyframes: {
        delayedSpin: {
          "0%, 10%": { transform: "rotate(0deg)" },
          "90%, 100%": { transform: "rotate(-360deg)" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
      },
      animation: {
        "infinite-spin": "delayedSpin 1.3s cubic-bezier(0.76, 0, 0.24, 1) infinite",
        spin: "spin 1.3s cubic-bezier(0.76, 0, 0.24, 1)",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      mono: ["Roboto mono", "monospace"],
    },
  },
  plugins: [],
};
