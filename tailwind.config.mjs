import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: { 
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        accent: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
      },
      fontFamily: {
        sans: [
          'Inter', 
          'ui-sans-serif', 
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Segoe UI', 
          'Roboto', 
          'sans-serif'
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace'
        ],
      },
      boxShadow: {
        'subtle': '0 2px 10px -3px rgba(0, 0, 0, 0.1)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.slate.700'),
            a: {
              color: theme('colors.primary.600'),
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: theme('colors.primary.700'),
                textDecoration: 'underline',
              },
            },
            'h1, h2, h3, h4': {
              color: theme('colors.slate.800'),
              fontWeight: theme('fontWeight.bold'),
            },
            h1: {
              fontSize: theme('fontSize.3xl[0]'),
              lineHeight: theme('fontSize.3xl[1].lineHeight'),
              marginTop: theme('spacing.10'),
              marginBottom: theme('spacing.4'),
            },
            h2: {
              fontSize: theme('fontSize.2xl[0]'),
              lineHeight: theme('fontSize.2xl[1].lineHeight'),
              marginTop: theme('spacing.8'),
              marginBottom: theme('spacing.3'),
            },
            h3: {
              fontSize: theme('fontSize.xl[0]'),
              lineHeight: theme('fontSize.xl[1].lineHeight'),
              marginTop: theme('spacing.6'),
              marginBottom: theme('spacing.2'),
            },
            h4: {
              fontSize: theme('fontSize.lg[0]'),
              lineHeight: theme('fontSize.lg[1].lineHeight'),
              marginTop: theme('spacing.4'),
              marginBottom: theme('spacing.2'),
            },
            'ul, ol': {
              paddingLeft: theme('spacing.6'),
            },
            blockquote: {
              fontStyle: 'normal',
              fontWeight: 'normal',
              color: theme('colors.slate.700'),
              borderLeftColor: theme('colors.primary.200'),
            },
            code: {
              color: theme('colors.slate.700'),
              fontWeight: '500',
              padding: `${theme('spacing.[0.5]')} ${theme('spacing.1')}`,
              borderRadius: theme('borderRadius.md'),
              backgroundColor: theme('colors.slate.100'),
            },
            pre: {
              backgroundColor: theme('colors.slate.100'),
              borderRadius: theme('borderRadius.lg'),
              padding: theme('spacing.4'),
              boxShadow: theme('boxShadow.sm'),
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.slate.300'),
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.300'),
              },
            },
            'h1, h2, h3, h4': {
              color: theme('colors.slate.200'),
            },
            blockquote: {
              color: theme('colors.slate.300'),
              borderLeftColor: theme('colors.primary.800'),
            },
            code: {
              color: theme('colors.slate.300'),
              backgroundColor: theme('colors.slate.800'),
            },
            pre: {
              backgroundColor: theme('colors.slate.900'),
              color: theme('colors.slate.300'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    typography,
    function({ addBase, theme }) {
      addBase({
        'html': { 
          fontFamily: [].concat(theme('fontFamily.sans')).join(', '),
          scrollBehavior: 'smooth',
        },
        'code, pre': {
          fontFamily: [].concat(theme('fontFamily.mono')).join(', '),
        },
      });
    },
  ],  
};
