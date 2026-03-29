import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://dev.jcsawyer.me',
  vite: {
    server: {
      allowedHosts: ['.jcsx.me'],
    },
  },
  preview: {
    allowedHosts: ['.jcsx.me'],
  },  
  integrations: [tailwind()],
  devToolbar: { enabled: false },
});
