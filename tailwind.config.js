const colors = require("tailwindcss/colors")

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        cyan: colors.cyan,
        nattu: "#00B77A",
        nattudark: "#008a5c",
        nattubtn: "#00AE6D"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
