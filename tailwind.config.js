module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Avenir Next LT Pro"],
      serif: ["Avenir Next LT Pro B"],
    },
    colors: {
      white: "#ffffff",
      black: "#202223",
      silver: "#F2F4F6",
      red: "#E11900",
      grey5: "#6B7684",
      grey6: "#4E5968",
      blue2: "#18A0D7",
      green: {
        light4: "#4BD865",
        DEFAULT: "#05944F",
        light: "#8BC34A",
      },
      grey: {
        light1: "#F9FAFB",
        light2: "#D1D6DB",
        DEFAULT: "#4E5968",
        light: "#DFE1E6",
        dark: "#AFAFAF",
        dark1: "#F2F4F6",
      },
      yellow: "#FFC043",
      purple: "#7356BF",
      blue: {
        light: "#18A0D7",
        DEFAULT: "#276EF1",
        dark: "#117DB8",
      },
      silver5: "#D1D6DB",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
