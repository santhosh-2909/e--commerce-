/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#004741',
          50: '#E6F0EF',
          100: '#C0D9D7',
          200: '#8FBCB8',
          300: '#5E9F9A',
          400: '#2D827B',
          500: '#004741',
          600: '#003E39',
          700: '#002E2A',
          800: '#001F1C',
          900: '#000F0D',
        },
        sand: {
          DEFAULT: '#F0EDE4',
          50: '#FDFCF9',
          100: '#F8F6F0',
          200: '#F0EDE4',
          300: '#E5E0D3',
          400: '#D4CDB8',
          500: '#C3BA9D',
        },
        accent: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { transform: 'translateY(20px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        slideDown: { from: { transform: 'translateY(-10px)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        scaleIn: { from: { transform: 'scale(0.95)', opacity: '0' }, to: { transform: 'scale(1)', opacity: '1' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        bounceGentle: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-4px)' } },
      },
      boxShadow: {
        'card': '0 2px 20px rgba(0,71,65,0.08)',
        'card-hover': '0 8px 40px rgba(0,71,65,0.15)',
        'primary': '0 4px 20px rgba(0,71,65,0.3)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #004741 0%, #006B63 100%)',
        'gradient-sand': 'linear-gradient(135deg, #F0EDE4 0%, #E5E0D3 100%)',
        'gradient-hero': 'linear-gradient(135deg, #002E2A 0%, #004741 50%, #006B63 100%)',
      },
    },
  },
  plugins: [],
};
