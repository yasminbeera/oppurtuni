/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        lavender: {
          50: '#F9F8FE',
          100: '#F3F0FC',
          200: '#E7E2FA',
          300: '#D5CCF6',
          400: '#BDB0F1',
          500: '#9E8DEC',
          600: '#7F67E6',
          700: '#684EE0',
          800: '#5436C7',
          900: '#3D2595',
        },
        softblue: {
          50: '#F2F7FF',
          100: '#E5EFFF',
          200: '#CFE2FF',
          300: '#A7CDFE',
          400: '#6CAEFC',
          500: '#3B90F7',
          600: '#1D72E8',
          700: '#1558C4',
        },
        softpink: {
          50: '#FDF2F7',
          100: '#FCE7F0',
          200: '#F9CFE2',
          300: '#F5A7C9',
          400: '#ED72A4',
          500: '#E24982',
        },
        mint: {
          50: '#F0FDF8',
          100: '#DCFCE7',
          200: '#BCF6D8',
          300: '#7CE9B8',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        periwinkle: {
          50: '#F4F5FF',
          100: '#EBEDFE',
          200: '#DCDFFD',
          300: '#BFC5FB',
          400: '#9AA3F7',
          500: '#7980F2',
          600: '#6064E7',
        },
        surface: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 14px -2px rgba(124, 103, 230, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 14px 30px -8px rgba(124, 103, 230, 0.12), 0 4px 12px -2px rgba(59, 144, 247, 0.06)',
        'soft-glow': '0 8px 30px -4px rgba(167, 139, 250, 0.25)',
        'mint-glow': '0 8px 24px -4px rgba(16, 185, 129, 0.25)',
        'blue-glow': '0 8px 24px -4px rgba(59, 144, 247, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
