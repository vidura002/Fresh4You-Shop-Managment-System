/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors:{
          Gray:{
            20 : '#D9D9D9'
          },
          green:{
            30: '#56F0D4'
          },
          orange:{
            10:'#FFDFBD',
            20:'#D7CCC8'
          },
          

      },
      fontFamily:{
        'kotta': ['Kotta One', 'serif'],
        'https://github.com/vidura002/ITP-Project/pull/10/conflict?name=client%252Ftailwind.config.js&ancestor_oid=aa3a36502a80b5721fb8397b86c075f33ae418f5&base_oid=901be8c0f1c92831ec7da2b338e728b99c5e848f&head_oid=14a4ed4d3f9efb232dacaf44728cdc01126a19a5madimi': ['Madimi One', 'sans-serif'], 
        'font1':['Rajdhani','sans-serif']
        
        'font2':['Rajdhani','sans-serif']
      }
    },
  },
  plugins: [],
}
