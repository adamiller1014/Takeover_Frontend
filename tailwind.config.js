module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        'xs': {'max': '639px'}
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
