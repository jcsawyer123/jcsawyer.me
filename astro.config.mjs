import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://dev.jcsawyer.me',
  vite: {
    server: {
      allowedHosts: ['dev.jcsx.me'],
    },
  },
  preview: {
    allowedHosts: ['dev.jcsx.me'],
  },  
  integrations: [tailwind()],
  devToolbar: { enabled: false }
});
