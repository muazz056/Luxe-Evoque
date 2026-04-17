import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary backgrounds
        bgPrimary: '#0B0B0B',
        bgSecondary: '#121212',
        bgCard: '#1A1A1A',
        bgNavbar: 'rgba(10, 10, 10, 0.85)',
        border: '#2A2A2A',
        
        // Gold accent palette
        gold: {
          DEFAULT: '#C6A96B',
          50: '#FDF8E8',
          100: '#FBEFD1',
          200: '#F7DFA3',
          300: '#F3CF75',
          400: '#EFBF47',
          500: '#C6A96B',
          600: '#A68B4B',
          700: '#7E6633',
          800: '#554616',
          900: '#2A230B',
          soft: '#E5D3A3',
          hover: '#D4B979',
          highlight: '#F5E6C8',
        },
        
        // Text colors
        text: {
          primary: '#F8F8F8',
          secondary: '#E0E0E0',
          muted: '#8A8A8A',
          light: '#DADADA',
        },
        link: {
          DEFAULT: '#C6A96B',
          hover: '#E5D3A3',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cinzel', 'Georgia', 'serif'],
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-down': 'fadeDown 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(198, 169, 107, 0.1), 0 10px 20px -2px rgba(198, 169, 107, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(198, 169, 107, 0.15)',
        'glow': '0 0 30px rgba(212, 175, 55, 0.3)',
        'glow-soft': '0 0 20px rgba(212, 175, 55, 0.15)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
};

export default config;