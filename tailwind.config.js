/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-primario': 'var(--color-primary)',
        'color-secundario': 'var(--color-secundary)',
        'color-texto': 'var(--color-texto)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'menu-shadow': '1px 0 5px #000',
      },
      display: {
        none: 'display-none',
      },
    },
  },
  plugins: [],
}

