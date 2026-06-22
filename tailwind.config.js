/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFF8F2',
          100: '#FFE8D6',
          200: '#FFD0AD',
          300: '#FFA500',
          400: '#FF8C2B',
          500: '#FF6B00',
          600: '#E85C00',
          700: '#CC4D00',
          800: '#B33E00',
          900: '#8B2F00',
        },
        earth: {
          50: '#F8F7F5',
          100: '#F0EDEB',
          200: '#E8E3DE',
          300: '#D9D0C8',
          400: '#C4B8AA',
          500: '#9B8E82',
          600: '#8B7D73',
          700: '#7B6D63',
          800: '#6B5D53',
          900: '#5B4D43',
        },
        navy: {
          50: '#F5F6F7',
          100: '#E8EAED',
          200: '#D1D5DB',
          300: '#9CA3AF',
          400: '#6B7280',
          500: '#4B5563',
          600: '#374151',
          700: '#2A2A2A',
          800: '#1E1E1E',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Clash Display', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xs': '8px',
        'sm': '12px',
        'md': '16px',
        'lg': '24px',
        'xl': '28px',
        '2xl': '32px',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.08)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        'soft': '0 8px 16px rgba(255, 107, 0, 0.08)',
        'glow': '0 0 20px rgba(255, 107, 0, 0.15)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #FF6B00 0%, #FF8C2B 50%, #FFA500 100%)',
        'gradient-brand-light': 'linear-gradient(135deg, #FFB347 0%, #FFA500 50%, #FF8C2B 100%)',
        'gradient-dark': 'linear-gradient(180deg, #F8F7F5 0%, #F0EDEB 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};
