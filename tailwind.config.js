/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },
    extend: {
      colors: {
        primary: {
          50: '#FFF5F0',
          100: '#FFE8DB',
          200: '#FFD1B5',
          300: '#FFB38A',
          400: '#FF8F5A',
          500: '#FF6B35',
          600: '#E85A28',
          700: '#C2471F',
          800: '#9B391A',
          900: '#7D2F18',
        },
        accent: {
          50: '#E8FAF5',
          100: '#C5F5E8',
          200: '#8FECD4',
          300: '#55E2BE',
          400: '#2DD4AA',
          500: '#00B894',
          600: '#00A082',
          700: '#00876F',
          800: '#006E5C',
          900: '#00584A',
        },
        cream: {
          50: '#FFFCFA',
          100: '#FFF9F5',
          200: '#FFF3EA',
          300: '#FFE8D9',
        },
        dark: {
          600: '#636E72',
          700: '#2D3436',
          800: '#1a1e1f',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Noto Sans"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-md': ['3rem', { lineHeight: '1.2' }],
        'display-sm': ['2.25rem', { lineHeight: '1.25' }],
      },
      boxShadow: {
        'card': '0 2px 12px rgba(45, 52, 54, 0.08)',
        'card-hover': '0 8px 24px rgba(255, 107, 53, 0.15)',
        'button': '0 4px 14px rgba(255, 107, 53, 0.35)',
        'modal': '0 20px 60px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-up': 'fadeUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient':
          'linear-gradient(135deg, rgba(255, 107, 53, 0.95) 0%, rgba(232, 90, 40, 0.9) 100%)',
        'button-gradient': 'linear-gradient(135deg, #FF6B35 0%, #FF8F5A 100%)',
        'success-gradient': 'linear-gradient(135deg, #00B894 0%, #55E2BE 100%)',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
};
