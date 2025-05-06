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
              color: 'var(--color-accent-600)',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: 'var(--color-accent-700)',
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
              borderLeftColor: 'var(--color-accent-200)',
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
          // Theme colors - blue-based
          '--color-theme-50': '#f0f9ff',
          '--color-theme-100': '#e0f2fe',
          '--color-theme-200': '#bae6fd',
          '--color-theme-300': '#7dd3fc',
          '--color-theme-400': '#38bdf8',
          '--color-theme-500': '#0ea5e9',
          '--color-theme-600': '#0284c7',
          '--color-theme-700': '#0369a1',
          '--color-theme-800': '#075985',
          '--color-theme-900': '#0c4a6e',
          '--color-theme-950': '#082f49',
          
          // Accent colors - indigo-based
          '--color-accent-50': '#eef2ff',
          '--color-accent-100': '#e0e7ff',
          '--color-accent-200': '#c7d2fe',
          '--color-accent-300': '#a5b4fc',
          '--color-accent-400': '#818cf8',
          '--color-accent-500': '#6366f1',
          '--color-accent-600': '#4f46e5',
          '--color-accent-700': '#4338ca',
          '--color-accent-800': '#3730a3',
          '--color-accent-900': '#312e81',
          '--color-accent-950': '#1e1b4b',
          
          // Semantic colors - light mode
          '--color-surface': '#ffffff',
          '--color-surface-muted': 'rgba(255, 255, 255, 0.8)',
          '--color-surface-subtle': '#f8fafc',
          '--color-surface-emphasis': '#f1f5f9',
          
          '--color-content': '#475569',
          '--color-content-strong': '#1e293b',
          '--color-content-muted': '#64748b',
          '--color-content-subtle': '#94a3b8',
          '--color-content-inverse': '#ffffff',
          
          '--color-border': '#e2e8f0',
          '--color-border-subtle': '#f1f5f9',
          '--color-border-emphasis': '#cbd5e1',
          
          // Shadows
          '--shadow-subtle': '0 1px 2px rgba(0, 0, 0, 0.04)',
          '--shadow-default': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
          '--shadow-medium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          '--shadow-large': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          
          // Panel spacing
          '--spacing-panel-sm': '0.75rem',
          '--spacing-panel-md': '1.25rem',
          '--spacing-panel-lg': '2rem',
        },
        // Dark mode overrides
        '.dark': {
          '--color-surface': '#0f172a',
          '--color-surface-muted': 'rgba(15, 23, 42, 0.8)',
          '--color-surface-subtle': '#1e293b',
          '--color-surface-emphasis': '#334155',
          
          '--color-content': '#cbd5e1',
          '--color-content-strong': '#f8fafc',
          '--color-content-muted': '#94a3b8',
          '--color-content-subtle': '#64748b',
          '--color-content-inverse': '#1e293b',
          
          '--color-border': '#334155',
          '--color-border-subtle': '#1e293b',
          '--color-border-emphasis': '#475569',
          
          '--shadow-subtle': '0 1px 2px rgba(0, 0, 0, 0.3)',
          '--shadow-default': '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
          '--shadow-medium': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
          '--shadow-large': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        },
        
        // Base styles
        'html, body': {
          overflowX: 'hidden',
          scrollBehavior: 'smooth'
        },
        ':focus-visible': {
          outline: 'none',
          ring: '2px',
          ringColor: 'var(--color-accent-400)',
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