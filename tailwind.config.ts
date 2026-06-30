import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        win95: {
          bg:       '#c0c0c0',
          dark:     '#808080',
          title:    '#000080',
          titleAlt: '#1084d0',
          teal:     '#008080',
          white:    '#ffffff',
          black:    '#000000',
          selected: '#000080',
        },
      },
      fontFamily: {
        pixel:  ['"Press Start 2P"', 'monospace'],
        retro:  ['VT323', 'monospace'],
        system: ['Arial', 'Helvetica', 'sans-serif'],
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        marquee: 'marquee 12s linear infinite',
        flicker: 'flicker 0.15s infinite alternate',
        'eq-bar': 'eqBar 0.5s ease-in-out infinite alternate',
        confetti: 'confettiDrop 3s ease-in forwards',
        'boot-progress': 'bootProgress 2s ease-out forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        flicker: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0.6' },
        },
        eqBar: {
          '0%': { transform: 'scaleY(0.1)' },
          '100%': { transform: 'scaleY(1)' },
        },
        confettiDrop: {
          '0%': { transform: 'translateY(-100px)', opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        bootProgress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
}
export default config
