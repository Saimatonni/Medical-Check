/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#1B406C',
      },
      maxWidth: {
        'container': '1320px',
      },
      fontFamily: {
        'sans': ['Open Sans', 'sans-serif'],
        'nun': [ 'Nunito', 'sans-serif'],
      }
    },
  },
  plugins: [],
}