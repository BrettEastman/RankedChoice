/** @type {import('tailwindcss').Config} */
export default {
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: "#5C73C4",
        primaryDark: "#3F4C9C",
        secondary: "#A7393D",
      },
    },
  },
  purge: ["./index.html", "./src/**/*.{svelte,js,ts}"], // for unused CSS
  variants: {
    extend: {},
  },
  darkMode: false, // or 'media' or 'class'
};
