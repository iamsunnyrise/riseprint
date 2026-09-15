/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rozha: ['"Rozha One"', 'serif'],
        yatra: ['"Yatra One"', 'cursive', 'serif'],
        tiro: ['"Tiro Devanagari Hindi"', 'serif'],
        notoSerif: ['"Noto Serif Devanagari"', 'serif'],
        gotu: ['"Gotu"', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif']
      },
      colors: {
        sindoor: {
          50: '#fdf2f2',
          100: '#fde8e8',
          200: '#fbd5d5',
          300: '#f8b4b4',
          400: '#f98080',
          500: '#f05252',
          600: '#e02424',
          700: '#c81e1e',
          800: '#9b1c1c',
          900: '#771d1d',
          950: '#450a0a',
          card: '#ad1414',
          dark: '#8b0e0e',
          gold: '#cba135'
        }
      }
    },
  },
  plugins: [],
}
