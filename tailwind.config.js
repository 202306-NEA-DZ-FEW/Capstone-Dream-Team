/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      screens: {
        'xl2': '1160px', // Add your custom breakpoint
        'md2': '820px',

        'lg2': '1330px',

        'lg3': '1357px',
        'm3': '854px',
        's3': '820px',
      },
    },
  },
  plugins: [],
}

