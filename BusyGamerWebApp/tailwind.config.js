/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'app-main': '#2D2D2D',
      'app-secondary': '#242424',
      'app-secondary-dark': '#171717',
      'app-complementary': '#0063AA',
      'app-grey': '#696969',
      white: '#FFF',
      black: '#000',
    },
    fontFamily: {
      sans: ['JetBrains'],
    },
    extend: {
      dropShadow: {
        '3xl': '0 0px 6px rgba(0, 0, 0, .5)',
      },
    },
  },
  plugins: {},
}
