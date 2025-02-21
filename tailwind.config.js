/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gilroyBold: ["Gilroy-Bold", "sans-serif"],
        gilroyMedium: ["Gilroy-Medium", "sans-serif"],
        gilroyLight: ["Gilroy-Light", "sans-serif"],
      },
    },
  },
  plugins: [],
};

