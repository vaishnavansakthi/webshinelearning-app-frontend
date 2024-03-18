/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        primary: "#3490dc",
        secondary: "#ffed4a",
      },
      extend: {
        outline: {
          'red-400': ['2px', 'solid', '#FC8181'],
        },
      }
    },
  },
  plugins: [],
}
