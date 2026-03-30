import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { loadEnv } from 'vite';
import { resolveFlags } from './src/config/flag-defs.js';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');
const flags = resolveFlags(env);

export default defineConfig({
  site: 'https://jcsawyer.me',
  vite: {
    server: {
      allowedHosts: ['.jcsawyer.me', 'jcsawyer.me'],
    },
  },
  preview: {
    allowedHosts: ['.jcsawyer.me', 'jcsawyer.me'],
  },  
  integrations: [
    tailwind(),
    sitemap({
      filter(page) {
        const pathname = new URL(page).pathname.replace(/\/+$/, '') || '/';

        if (!flags.showBlogPage && (pathname === '/blog' || pathname.startsWith('/blog/'))) {
          return false;
        }

        if (!flags.showContactPage && pathname === '/contact') {
          return false;
        }

        if (!flags.showSelectedWorkPage && pathname === '/projects') {
          return false;
        }

        return true;
      },
    }),
  ],
  devToolbar: { enabled: false },
});
