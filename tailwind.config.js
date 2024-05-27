/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {},
  },
  darkMode:"class",
  plugins: [require("rippleui"), require('flowbite/plugin')],
}

