/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-primario': 'var(--color-primary)',
        'color-secundario': 'var(--color-secundary)',
        'color-texto': 'var(--color-texto)',
        'color-primario-categories': 'var(--color-primary-categories)',
      },
      boxShadow: {
        'menu-shadow': '1px 0 5px #000',
      },
    },
  },
  plugins: [],
};
