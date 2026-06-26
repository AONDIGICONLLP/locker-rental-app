/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FBF6EC',
          100: '#F5EACB',
          400: '#D8AE4D',
          500: '#C2932E',
          600: '#9C7224',
          700: '#7A5A21',
          800: '#5B431A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'serif'],
      },
    },
  },
  plugins: [],
};
