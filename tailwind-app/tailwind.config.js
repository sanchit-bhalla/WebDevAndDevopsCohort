/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        red: {
          500: "green",
        },
        clr2: "red",
        clr3: "blue",
      },
      screens: {
        md: "768px",
        lg: "1024px",
      },
    },
  },
  plugins: [],
};
