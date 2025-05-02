import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
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
