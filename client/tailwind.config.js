/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gram: {
          primary: "#176B3A",       // Deep Green
          "primary-hover": "#12542D",
          "primary-light": "#E8F5ED",
          secondary: "#4F9D45",     // Leaf Green
          "secondary-hover": "#3E8336",
          "secondary-light": "#F0F9ED",
          accent: "#F4B942",        // Warm Yellow/Gold
          "accent-hover": "#E5A932",
          "accent-light": "#FEF7E7",
          bg: "#F8FAF5",            // Off-white
          card: "#FFFFFF",
          text: "#1F2937",          // Dark charcoal
          muted: "#64748B",
          border: "#E2E8F0",
          earth: "#8B5A2B",
          terracotta: "#C85A32",
          harvest: "#E9B343"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        devanagari: ['"Noto Sans Devanagari"', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(23, 107, 58, 0.08), 0 2px 6px -2px rgba(0, 0, 0, 0.04)',
        'soft-hover': '0 10px 25px -4px rgba(23, 107, 58, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.06)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 25px rgba(244, 185, 66, 0.3)'
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem'
      }
    },
  },
  plugins: [],
}
