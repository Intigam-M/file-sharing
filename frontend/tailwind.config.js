/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
  theme: {
    container: {
        center: true,
        screens: {
          lg: '1140px',
          xl: '1140px',
          '2xl': '1140px',
        },
      },
    extend: {},
  },
  plugins: [],
}

