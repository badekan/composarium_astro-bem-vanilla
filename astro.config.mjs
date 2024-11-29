// @ts-check
import { defineConfig } from 'astro/config';

import icon from 'astro-icon';

import react from '@astrojs/react';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler' // or "modern"
        }
      }
    }
  },

  integrations: [icon(), react(), mdx()]
});