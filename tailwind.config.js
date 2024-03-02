/** @type {import('tailwindcss').Config} */

module.exports = {
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
        bg: 'var(--c-bg)',
        bg2: 'var(--c-bg2)',
        'bg-card': 'var(--c-bg-card)',
        'bg-card-hover': 'var(--c-bg-card-hover)',
        primary: 'var(--c-primary)',
        link: 'var(--c-text-link)',
        selected: 'var(--c-selected)',
        'link-hover': 'var(--c-text-link-hover)',
        border: 'var(--c-border)',
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
        'header-left': 'header-left 1s ease-in-out',
        'header-right': 'header-right 1s ease-in-out',
        'bg-img': 'bg-img 1s ease-in-out',
        main: 'main 1s ease-in-out',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
