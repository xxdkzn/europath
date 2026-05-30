/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // EuroPath фирменные цвета
        brand: {
          50:  '#e8f0fe',
          100: '#c5d8fc',
          500: '#2563EB',
          600: '#1d4ed8',
          700: '#1e40af',
        },
        accent: {
          400: '#fb923c',
          500: '#f97316',
        }
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
