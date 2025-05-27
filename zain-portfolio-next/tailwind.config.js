/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Required for manual toggling
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#1b1b1b",
        light: "#f5f5f5",
        primary: "#B63E96",
        primaryDark: "#58E6D9",
      },
      backgroundColor: {
        light: "#f5f5f5",
        dark: "#1b1b1b",
      },
      textColor: {
        light: "#f5f5f5",
        dark: "#1b1b1b",
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
      }
    },
  },
  plugins: [],
}

