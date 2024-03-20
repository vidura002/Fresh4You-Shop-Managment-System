/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
          Gray:{
            20 : '#D9D9D9'
          },
          green:{
            30: '#56F0D4'
          }
      },
      fontFamily:{
        'kotta': ['Kotta One', 'serif']
      }
    },
  },
  plugins: [],
}
