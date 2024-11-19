/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: '#ffd700',
        darkBlue: '#001a36',
        midBlue: '#00264d',
        blue: {
          100: "#bfdbfe",
          200: "#93c5fd",
        },
        red: {
          100: "#fecaca",
          200: "#ef6868",
        },
      },
      boxShadow: {
        wow: '0 0 20px rgba(0, 0, 0, 0.8), inset 0 0 10px rgba(255, 215, 0, 0.5)',
        textOutline:
            '2px 2px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000',
      },
      textShadow: {
        lg: '0 4px 6px rgba(0, 0, 0, 0.7), 0 1px 3px rgba(0, 0, 0, 0.5)', // Custom text shadow
      },
      fontFamily: {
        wow: ['LifeCraft', 'serif'], // Custom font for WoW-style text
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow'),
  ],
};

