/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0a0a0b',
          800: '#111113',
          700: '#17171a',
          600: '#1f1f24',
        },
        accent: {
          DEFAULT: '#7c5cff',
          soft: '#a78bfa',
          deep: '#4c1d95',
        },
        mist: '#b9b9c6',
      },
      fontFamily: {
        display: ['"Clash Display"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        glow: '0 0 60px -12px rgba(124, 92, 255, 0.45)',
        'glow-sm': '0 0 28px -8px rgba(124, 92, 255, 0.5)',
      },
    },
  },
  plugins: [],
};
