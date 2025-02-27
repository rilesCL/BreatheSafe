/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'green-aqi': '#4ade80',
        'yellow-aqi': '#facc15',
        'orange-aqi': '#fb923c',
        'red-aqi': '#ef4444',
        'purple-aqi': '#a855f7',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}