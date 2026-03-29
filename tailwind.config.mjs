import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './public/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  darkMode: 'class',
  theme: { 
    extend: {
      // Define a consistent color system with semantic naming
      colors: {
        // Main theme colors with semantic naming
        theme: {
          50: 'var(--color-theme-50)',
          100: 'var(--color-theme-100)',
          200: 'var(--color-theme-200)',
          300: 'var(--color-theme-300)',
          400: 'var(--color-theme-400)',
          500: 'var(--color-theme-500)',
          600: 'var(--color-theme-600)',
          700: 'var(--color-theme-700)',
          800: 'var(--color-theme-800)',
          900: 'var(--color-theme-900)',
          950: 'var(--color-theme-950)',
        },
        // Accent colors for highlights and CTAs
        accent: {
          50: 'var(--color-accent-50)',
          100: 'var(--color-accent-100)',
          200: 'var(--color-accent-200)',
          300: 'var(--color-accent-300)',
          400: 'var(--color-accent-400)',
          500: 'var(--color-accent-500)',
          600: 'var(--color-accent-600)',
          700: 'var(--color-accent-700)',
          800: 'var(--color-accent-800)',
          900: 'var(--color-accent-900)',
          950: 'var(--color-accent-950)',
        },
        // Background colors (surface layers)
        surface: {
          DEFAULT: 'var(--color-surface)',
          muted: 'var(--color-surface-muted)',
          subtle: 'var(--color-surface-subtle)',
          emphasis: 'var(--color-surface-emphasis)',
        },
        // Text colors
        content: {
          DEFAULT: 'var(--color-content)',
          strong: 'var(--color-content-strong)',
          muted: 'var(--color-content-muted)',
          subtle: 'var(--color-content-subtle)',
          inverse: 'var(--color-content-inverse)',
        },
        // Border colors
        border: {
          DEFAULT: 'var(--color-border)',
          subtle: 'var(--color-border-subtle)',
          emphasis: 'var(--color-border-emphasis)',
        },
      },
      // Shadow system
      boxShadow: {
        'subtle': 'var(--shadow-subtle)',
        'default': 'var(--shadow-default)',
        'medium': 'var(--shadow-medium)',
        'large': 'var(--shadow-large)',
      },
      // Consistent spacing for panels
      padding: {
        'panel-sm': 'var(--spacing-panel-sm)',
        'panel-md': 'var(--spacing-panel-md)',
        'panel-lg': 'var(--spacing-panel-lg)',
      },
      // Typography styles using Tailwind Typography plugin
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--color-content)',
            a: {
              color: 'var(--color-theme-600)',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: 'var(--color-theme-700)',
                textDecoration: 'underline',
              },
            },
            'h1, h2, h3, h4': {
              color: 'var(--color-content-strong)',
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
              color: 'var(--color-content)',
              borderLeftColor: 'var(--color-theme-200)',
            },
            code: {
              color: 'var(--color-content)',
              fontWeight: '500',
              padding: `${theme('spacing.[0.5]')} ${theme('spacing.1')}`,
              borderRadius: theme('borderRadius.md'),
              backgroundColor: 'var(--color-surface-subtle)',
            },
            pre: {
              backgroundColor: 'var(--color-surface-subtle)',
              borderRadius: theme('borderRadius.lg'),
              padding: theme('spacing.4'),
              boxShadow: 'var(--shadow-subtle)',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
            },
          },
        },
      }),
    },
  },
  plugins: [
    typography,
    function({ addBase }) {
      addBase({
        // Define CSS variables for our theme system
        ':root': {
          // Theme colors - teal
          '--color-theme-50': '#edfafa',
          '--color-theme-100': '#d8f1f1',
          '--color-theme-200': '#b8e3e3',
          '--color-theme-300': '#8ecfcf',
          '--color-theme-400': '#5fb3b3',
          '--color-theme-500': '#2d9494',
          '--color-theme-600': '#0f7c7c',
          '--color-theme-700': '#0c6868',
          '--color-theme-800': '#0b4d4d',
          '--color-theme-900': '#083535',
          '--color-theme-950': '#001a1a',

          // Accent colors - crimson
          '--color-accent-50': '#fdf2f4',
          '--color-accent-100': '#f9d9de',
          '--color-accent-200': '#f1b3be',
          '--color-accent-300': '#e48192',
          '--color-accent-400': '#cf596d',
          '--color-accent-500': '#b64353',
          '--color-accent-600': '#9d2f40',
          '--color-accent-700': '#8f1d2c',
          '--color-accent-800': '#741723',
          '--color-accent-900': '#5b141d',
          '--color-accent-950': '#32080e',

          // Semantic colors - light mode
          '--color-surface': '#ffffff',
          '--color-surface-muted': 'rgba(255, 255, 255, 0.88)',
          '--color-surface-subtle': '#f8fcfc',
          '--color-surface-emphasis': '#edf6f6',

          '--color-content': '#133131',
          '--color-content-strong': '#0b2020',
          '--color-content-muted': '#5f7d7d',
          '--color-content-subtle': '#7d9898',
          '--color-content-inverse': '#ffffff',

          '--color-border': '#d7e7e7',
          '--color-border-subtle': '#e8f1f1',
          '--color-border-emphasis': '#b8cdcd',

          '--theme-300-rgb': '142, 207, 207',
          '--border-rgb': '215, 231, 231',
          
          // Shadows
          '--shadow-subtle': '0 1px 2px rgba(6, 19, 19, 0.05)',
          '--shadow-default': '0 8px 24px rgba(8, 29, 29, 0.08), 0 1px 2px rgba(8, 29, 29, 0.04)',
          '--shadow-medium': '0 16px 36px rgba(8, 29, 29, 0.12), 0 4px 10px rgba(8, 29, 29, 0.06)',
          '--shadow-large': '0 24px 56px rgba(8, 29, 29, 0.16), 0 8px 18px rgba(8, 29, 29, 0.08)',
          
          // Panel spacing
          '--spacing-panel-sm': '0.75rem',
          '--spacing-panel-md': '1.25rem',
          '--spacing-panel-lg': '2rem',
        },
        // Dark mode overrides
        '.dark': {
          '--color-surface': '#0d1717',
          '--color-surface-muted': 'rgba(13, 23, 23, 0.88)',
          '--color-surface-subtle': '#102020',
          '--color-surface-emphasis': '#132626',

          '--color-content': '#d7ebeb',
          '--color-content-strong': '#e6f3f3',
          '--color-content-muted': '#8daaaa',
          '--color-content-subtle': '#6f8d8d',
          '--color-content-inverse': '#081010',

          '--color-border': '#1f3434',
          '--color-border-subtle': '#162626',
          '--color-border-emphasis': '#2a4444',

          '--theme-300-rgb': '142, 207, 207',
          '--border-rgb': '31, 52, 52',
          
          '--shadow-subtle': '0 1px 2px rgba(0, 0, 0, 0.3)',
          '--shadow-default': '0 12px 28px rgba(0, 0, 0, 0.28), 0 2px 6px rgba(0, 0, 0, 0.18)',
          '--shadow-medium': '0 22px 40px rgba(0, 0, 0, 0.34), 0 8px 16px rgba(0, 0, 0, 0.2)',
          '--shadow-large': '0 30px 64px rgba(0, 0, 0, 0.42), 0 12px 22px rgba(0, 0, 0, 0.26)',
        },
        
        // Base styles
        'html, body': {
          overflowX: 'hidden',
          scrollBehavior: 'smooth'
        },
        ':focus-visible': {
          outline: 'none',
          ring: '2px',
          ringColor: 'var(--color-theme-400)',
        },
        ':target': {
          scrollMarginTop: '6rem',
        },
        'h1, h2, h3, h4, h5, h6': {
          scrollMarginTop: '5rem',
          color: 'var(--color-content-strong)',
        },
      });
    },
  ],  
};
