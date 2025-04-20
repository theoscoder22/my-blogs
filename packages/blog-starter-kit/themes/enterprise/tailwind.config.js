/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0a192f',
        foreground: '#ccd6f6',
        muted: '#8892b0',
        primary: '#64ffda',
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        gray: colors.gray,
        blue: colors.blue,
      },
      spacing: {
        28: '7rem',
        72: '18rem',
        84: '21rem',
        96: '24rem',
      },
      fontSize: {
        '2xs': '0.625rem',
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        sm: '0 5px 10px rgba(0, 0, 0, 0.1)',
        md: '0 8px 30px rgba(0, 0, 0, 0.1)',
        soft: '0 4px 20px rgba(100, 255, 218, 0.05)',
      },
      lineHeight: {
        tight: 1.2,
        relaxed: 1.75,
      },
      letterSpacing: {
        tighter: '-.04em',
        widest: '.25em',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: '#efdecd',
            h1: { color: '#efdecd' },
            h2: { color: '#efdecd' },
            h3: { color: '#efdecd' },
            div:{backgroundColor:"#efdecd"},
            p: { color: '#efdecd' },
            a: {
              color: theme('colors.primary'),
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            strong: { color: theme('colors.foreground') },
            code: {
              backgroundColor: theme('colors.gray.800'),
              padding: '2px 4px',
              borderRadius: '4px',
              color: theme('colors.cyan.400'),
            },
            pre: {
              backgroundColor: theme('colors.gray.900'),
              color: theme('colors.gray.100'),
            },
            blockquote: {
              borderLeftColor: theme('colors.primary'),
              color: theme('colors.gray.400'),
            },
            'div[data-node-type="callout"]': {
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              backgroundColor: theme('colors.gray.100'),
              border: '1px solid ' + theme('colors.gray.300'),
              padding: '1rem 1.5rem',
              gap: '0.5rem',
              borderRadius: '0.5rem',
              margin: '1rem 0',
              wordBreak: 'break-word',
            },
            'div[data-node-type="callout-emoji"]': {
              background: theme('colors.gray.300'),
              borderRadius: '0.5rem',
              minWidth: '1.75rem',
              width: '1.75rem',
              height: '1.5rem',
              display: 'flex',
              marginTop: '0.3rem',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '1rem',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
