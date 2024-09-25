/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    colors: {
      primary: 'var(--primary)',
      secondary: 'var(--secondary)',
      secondaryLight: 'var(--secondaryLight)',
      secondaryLighter: 'var(--secondaryLighter)',
      accent: 'var(--accent)',
      accentLight: 'var(--accentLight)',
      text: 'var(--text)',
      textInv: 'var(--textInv)',
      success: 'var(--success)',
      warn: 'var(--warn)',
      category1: 'var(--category1)',
      category2: 'var(--category2)',
      transparent: 'var(--transparent)',
      transparent70: 'var(--transparent70)'
    },
    fontFamily: {
      sans: ['Heebo', 'sans-serif']
    },
    fontSize: {
      '3xs': '0.624rem',
      '2xs': '0.702rem',
      xs: '0.790rem',
      sm: '0.889rem',
      reg: '1rem',
      lg: '1.125rem',
      xl: '1.266rem',
      '2xl': '1.424rem',
      '3xl': '1.602rem',
      '4xl': '1.802rem',
      '5xl': '2.027rem',
      title: '2.561rem'
    },
    extend: {
      backgroundImage: {
        'bg-pattern': "url('/bgPattern.png')"
      },
      backgroundSize: {
        100: '100px'
      },
      screens: {
        xl: '1440px',
        '2xl': '1920px',
        content: '1568px'
      }
    }
  },
  plugins: []
}
