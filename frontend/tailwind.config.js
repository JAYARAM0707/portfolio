/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Theme-aware tokens — auto-flip between light/dark via CSS vars in index.css
        // Keeping legacy names ("navy", "slate") so existing components keep working.
        navy: {
          DEFAULT: 'rgb(var(--bg-primary) / <alpha-value>)',
          light: 'rgb(var(--bg-secondary) / <alpha-value>)',
          lightest: 'rgb(var(--bg-tertiary) / <alpha-value>)',
        },
        slate: {
          lightest: 'rgb(var(--text-primary) / <alpha-value>)',
          light: 'rgb(var(--text-secondary) / <alpha-value>)',
          DEFAULT: 'rgb(var(--text-muted) / <alpha-value>)',
          dark: 'rgb(var(--border) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          hover: 'rgb(var(--accent-hover) / <alpha-value>)',
          muted: 'rgb(var(--accent) / 0.1)',
        },
        cream: '#fafafa',
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },

      fontSize: {
        'hero-sm': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-md': ['4rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'hero-lg': ['5.5rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'hero-xl': ['7rem', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
      },

      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-down': 'fadeInDown 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'slide-in-right': 'slideInRight 0.8s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'blink': 'blink 1s step-end infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a0000 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.25), transparent)',
      },
    },
  },
  plugins: [],
}
