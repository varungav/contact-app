// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B6871',
        nav_bar_selected: '#D7EDFF',
        nav_bar_text_selected: '#4094F7',
        btnColor: '#4094F7',
      },
    },
  },
  plugins: [],
}
