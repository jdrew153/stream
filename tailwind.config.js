/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      'backgroundColor' : {
        'nav-bar-black' : '#141414',
        'vampire-black' : '#080808'
      },
      'borderWidth' : {
        '1' : '0.1px'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
