/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
        colors: {
            'search-colour': '#F6F6F6',
        }
    },
    fontFamily: {
        body: ['Nunito']
    }
  },
  plugins: [],
}