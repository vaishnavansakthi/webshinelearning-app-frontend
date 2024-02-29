/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#3490dc",
        secondary: "#ffed4a",
      },
    },
  },
  plugins: [],
}
