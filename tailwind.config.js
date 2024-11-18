/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": { DEFAULT: "#009EFF", 2: "#003F66", 6: "#33B1FF" },
        "secondary": "#00CC77",
        "error": "#FF002B",
        "w": {
          DEFAULT: "#FFFFFF",
          1: "#F9FAFA",
          2: "#F1F2F3",
          3: "#E3E6E8"
        },
        "b": {
          DEFAULT: "#000000",
          1: "#171A1C",
          2: "#2F3437",
          3: "#464E53"
        }
      }
    },
  },
  plugins: [],
}