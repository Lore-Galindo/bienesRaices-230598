/** @type {import('tailwindcss').Config} */
export default {
  content: ['./views/**/*.pug'],
  theme: {
    extend: {},
    colors:{
      'p_blue':{
        100: '#B1EDE8',
      },
        primary:  '#FFFFFF',   // Blanco
        secondary: '#000000', // Negro
        accent: '#E7B8C9',    // Antique White
        neutral: '#E89BC7',  
        dark: '#F5EFE6',      
        error: '#FF5252',
    },
  },
  plugins: [],
}

