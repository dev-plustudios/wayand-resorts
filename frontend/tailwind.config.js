/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest-green': '#0B3D2E',
        'emerald-dark': '#1F6F50',
        'emerald-light': '#3FA34D',
        'mist-white': '#F4F9F4',
        'sunset-orange': '#FF7A00',
        'water-blue': '#2EC4B6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'emerald-gradient': 'linear-gradient(to right, #1F6F50, #3FA34D)',
      }
    },
  },
  plugins: [],
}
