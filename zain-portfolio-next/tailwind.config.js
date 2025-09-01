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
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{css,scss}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#1b1b1b",
        light: "#f5f5f5",
        primary: "#B63E96",
        primaryDark: "#58E6D9",
      },
      fontSize: {
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1.125rem)',
        'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.25rem)',
        'fluid-lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.5rem)',
        'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.875rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.3rem + 1vw, 2.25rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.6rem + 1.375vw, 3rem)',
        'fluid-4xl': 'clamp(2.25rem, 1.9rem + 1.75vw, 3.75rem)',
        'fluid-5xl': 'clamp(3rem, 2.5rem + 2.5vw, 5rem)',
        'fluid-6xl': 'clamp(3.75rem, 3rem + 3.75vw, 6rem)',
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
        'spin-cw': 'spin-cw 30s linear infinite',
        'gradient': 'gradient 6s ease infinite',
        'fadeIn': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        'spin-cw': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },

        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

