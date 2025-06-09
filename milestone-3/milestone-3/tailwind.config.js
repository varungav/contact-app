/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height:{
        'noteHeight': 'calc(100vh - 132px)'
      }
    },
  },
  plugins: [],
}

