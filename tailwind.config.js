/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': "url('/src/assets/Fondo.jpg')",
      },
    },
  },
  plugins: [],
};
