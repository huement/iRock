import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://huement.github.io/iRock/',
  base: '/iRock/',
  integrations: [react()],
});