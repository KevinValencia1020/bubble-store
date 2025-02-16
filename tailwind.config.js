/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    "swiper", 
    "swiper-wrapper",
    "swiper-slide",
    "swiper-pagination",
    "swiper-pagination-bullet",
    "swiper-button-prev",
    "swiper-button-next"
  ],
  theme: {
    extend: {
      colors: {
        'color-primario': 'var(--color-primary)',
        'color-secundario': 'var(--color-secundary)',
        'color-texto': 'var(--color-texto)',
        'color-primario-categories': 'var(--color-primary-categories)',
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
      animation: {
        'header-input-animation': 'header-input-animation 0.3 ease-in-out',
      },
      keyframes: {
        'header-input-animation': {
          '0%': {width: '90%'},
          '100%': {width: '100%'},
        },
      },
    },
  },
  plugins: [],
}

