/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,html}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js'
  ],
  theme: {
    colors: {
      primary: 'var(--primary)',
      secondary: 'var(--secondary)',
      secondaryLight: 'var(--secondaryLight)',
      secondaryLighter: 'var(--secondaryLighter)',
      secondaryLightest: 'var(--secondaryLightest)',
      accent: 'var(--accent)',
      accentLight: 'var(--accentLight)',
      text: 'var(--text)',
      textInv: 'var(--textInv)',
      success: 'var(--success)',
      warn: 'var(--warn)',
      category1: 'var(--category1)',
      category2: 'var(--category2)',
      transparent: 'var(--transparent)',
      transparent70: 'var(--transparent70)',
      transparent70B: 'var(--transparent70B)',
      blue: {
        50: '#f5f7fa',
        100: '#ebeef3',
        200: '#d2dae5',
        300: '#abbbce',
        400: '#7e97b2',
        500: '#5d7a9a',
        600: '#496180',
        700: '#415570',
        800: '#354457',
        900: '#2f3b4b',
        950: '#202631'
      }
    },
    fontFamily: {
      sans: ['Heebo', 'sans-serif']
    },
    fontSize: {
      '3xs': '0.624em',
      '2xs': '0.702em',
      xs: '0.790em',
      sm: '0.889em',
      reg: '1em',
      lg: '1.125em',
      xl: '1.266em',
      '2xl': '1.424em',
      '3xl': '1.602em',
      '4xl': '1.802em',
      '5xl': '2.027em',
      title: '2.561em'
    },
    extend: {
      backgroundImage: {
        'bg-pattern': "url('/bgPattern.png')"
      },
      backgroundSize: {
        100: '100px'
      },
      borderWidth: {
        1: '1px'
      },
      borderRadius: {
        card: '0.625rem'
      },
      minWidth: {
        'xs-card': 'calc(50% - .55rem)',
        'sm-card': 'calc(33.33% - .69rem)',
        'md-card': 'calc(25% - .78rem)',
        card: 'calc(16.66% - .84rem)'
      },
      maxWidth: {
        secondaryHeader: '48.625rem'
      },
      screens: {
        xl: '1440px',
        '2xl': '1920px',
        'content-pad': '1600px',
        content: '1568px'
      }
    }
  },
  keyframes: {
    slideUpAndFade: {
      '0%': { opacity: '0', transform: 'translateY(2px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' }
    },
    slideRightAndFade: {
      '0%': { opacity: '0', transform: 'translateX(-2px)' },
      '100%': { opacity: '1', transform: 'translateX(0)' }
    },
    slideDownAndFade: {
      '0%': { opacity: '0', transform: 'translateY(-2px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' }
    },
    slideLeftAndFade: {
      '0%': { opacity: '0', transform: 'translateX(2px)' },
      '100%': { opacity: '1', transform: 'translateX(0)' }
    }
  },
  animation: {
    slideUpAndFade: 'slideUpAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)',
    slideDownAndFade: 'slideDownAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)',
    slideRightAndFade: 'slideRightAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)',
    slideLeftAndFade: 'slideLeftAndFade 300ms cubic-bezier(0.16, 0, 0.13, 1)'
  },

  plugins: []
}
