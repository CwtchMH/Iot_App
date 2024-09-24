/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
       'bg-blue-100',
       'bg-blue-200',
       'bg-blue-400',
       'bg-blue-700',
       'bg-red-100',
       'bg-red-200',
       'bg-red-300',
       'bg-red-600',
       'bg-yellow-100',
       'bg-yellow-200',
       'bg-yellow-400',
       'bg-yellow-700',
       
       // ... add other colors you need
     ],
});
