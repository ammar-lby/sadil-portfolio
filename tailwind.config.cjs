/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#663635",//main background color brown
        secondary: "#F1E6E1 ", // beige for text
        tertiary: "#DEB3AD    ", //dusty rose for cards
        "black-100": "#F1E6E1", //
        "black-200": "#8B5E55 ",
        "black-300": "#5A332D  ",
        "beige-100": "#F5D9D5",
      
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 20px 60px -10px rgba(190, 140, 130, 0.4)",

      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
