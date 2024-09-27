/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: [
        'var(--font-noto-sans-sc)',
        'ui-sans-serif',
        'system-ui',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
      mono: [
        'var(--font-jb-mono)',
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace',
      ],
      serif: [
        'ui-serif',
        'Georgia',
        'Cambria',
        'Times New Roman',
        'Times',
        'serif',
      ],
    },
    extend: {
      colors: {
        primary: {
          100: '#FCE1DC',
          200: '#F7C5BB',
          300: '#EF9986',
          400: '#DE654A',
          500: '#C54022',
          600: '#A33016',
        },
        secondary: {
          100: '#FCE8DC',
          200: '#F7D3BC',
          300: '#F0AE86',
          400: '#DE8249',
          500: '#C45F21',
        },
        neutral: {
          100: '#FAF8F7',
          200: '#E5E3E3',
          300: '#D4CDCC',
          400: '#A39998',
          500: '#736866',
          600: '#524542',
          700: '#40312E',
          800: '#26120E',
          900: '#170602',
        },
        bg: 'var(--c-bg)',
        bg2: 'var(--c-bg2)',
        'bg-card': 'var(--c-bg-card)',
        'bg-card-hover': 'var(--c-bg-card-hover)',
        'bg-card-tag': 'var(--c-card-tag-bg)',
        link: 'var(--c-text-link)',
        selected: 'var(--c-selected)',
        'button-active': 'var(--c-button-active)',
        'link-hover': 'var(--c-text-link-hover)',
        border: 'var(--c-border)',
        'title': 'var(--c-title)',
        'primary-text': 'var(--c-text-primary)',
        'secondary-text': 'var(--c-text-secondary)',
      },
      fontFamily: {
        sriracha: [
          'var(--font-sriracha)',
          'var(--font-noto-sans-sc)',
          'ui-sans-serif',
          'sans-serif',
        ],
        rubik: ['var(--font-rubik)', 'ui-sans-serif', 'sans-serif'],
        fredoka: ['var(--font-fredoka)', 'ui-sans-serif', 'sans-serif'],
      },
      keyframes: {
        'header-left': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'header-right': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'bg-img': {
          '0%': { opacity: '0', transform: 'translateY(-50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        main: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'header-left': 'header-left 0.5s ease-in-out',
        'header-right': 'header-right 0.5s ease-in-out',
        'bg-img': 'bg-img 0.5s ease-in-out',
        main: 'main 0.7s ease-in-out',
      },
      transitionProperty: {
        'bg-size': 'background-size',
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
