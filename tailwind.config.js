/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#121212',
        paper: '#F4F1EA',
        mist: '#E7E2D8',
        volt: '#FF5A1F',
        ember: '#C2410C',
      },
      fontFamily: {
        sans: ['Manrope', 'Segoe UI', 'sans-serif'],
        display: ['Syne', 'Manrope', 'sans-serif'],
      },
      boxShadow: {
        card: '0 18px 50px -28px rgba(18, 18, 18, 0.55)',
      },
    },
  },
  plugins: [],
};
