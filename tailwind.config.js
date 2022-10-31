/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lightBold: "#dbe1e6",
        lightMedium: "#edf2f6",
        light: "#fafcff",
        darkMedium: "#373747",
        darkBold: "#434358",
        mainDark: "#373747",
        mainLight: "#f5f9fc",
        dark: "#323245",
        colorText: "#fe2c55",
        blackOverlay: 'rgba(0, 0 ,0 ,0.7)',
        iconColor: "#0084ff",
        modelColor: "#262634",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        'btnShadow': "0px 0px 7px 12px #e6e9ec",
        'btnDarkShadow': "0px 0px 7px 12px #434358",
      },
      spacing: {
        '9/20': '45%',
      }
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
