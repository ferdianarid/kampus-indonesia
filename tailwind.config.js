const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#14375D",
      },
      fontFamily: {
        roboto: ["roboto", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {
      borderWidth: ["last"],
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      const utilities = {};
      addUtilities(utilities);
    }),
  ],
};
