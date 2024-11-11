/** @type {import('tailwindcss').Config} */
export default {
  content: ['./views/**/*.pug'],
  theme: {
    extend: {
      colors:{
        black: '#000000',
        white: '#FFFFFF',
        violeta: '#E89BC7',
        rosa: '#E7B8C9',
        amarillo: '#F5EFE6',
      }
    },
  },
  plugins: [],
}

