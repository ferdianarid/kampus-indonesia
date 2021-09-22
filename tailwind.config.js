const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#14375D'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const utilities = {

      }
      addUtilities(utilities)
    })
  ]
}
