/**
 * tailwind.config.js
 * Purpose: Configuration file for Tailwind CSS framework
 * Features:
 * - Custom color palette definition
 * - Dark mode configuration
 * - Custom animations and transitions
 * - Theme extension and customization
 * - Content paths configuration
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Required for manual toggling
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
        'fadeIn': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
