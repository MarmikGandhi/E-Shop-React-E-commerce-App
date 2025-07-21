module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#4f46e5', // indigo-600
          dark: '#4338ca',
          light: '#6366f1',
        },
      },
    },
  },
  plugins: [],
};
