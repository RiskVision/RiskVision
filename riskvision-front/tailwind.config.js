/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage:{
        'banner': "url('./banner.png')",
        'homebg': "url('./home-bg.png')"
      },
      colors:{
        '508C9B': '#508C9B',
        '134B70': '#134B70',
        '201E43': '#201E43',
        'white': '#EEEEEE'
      }
    },
  },
  plugins: [],
}


