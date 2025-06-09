/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
        colors: {
            'primary': '#F9A8D4',
            'secondary': '#937DC2',
            'tertiary': '#312E81',
            'quaternary': '#4C1D95',
        }
    },
    fontFamily: {
        body: ['Nunito']
    }
  },
  plugins: [],
}