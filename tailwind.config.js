/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        cwhite: {
          dark: '#D8D2C2',
          DEFAULT: '#FAF7F0'
        },
        corange: {
          DEFAULT: '#B17457',
        },
        cblack: {
          DEFAULT: '#4A4947',
        },
      },
    },
  },
  plugins: [],
}

