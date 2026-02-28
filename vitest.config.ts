import { getViteConfig } from 'astro/config';
import { defineConfig } from 'vitest/config';

export default defineConfig(
  getViteConfig({
    test: {
      globals: true,
      environment: 'happy-dom',
      exclude: ['node_modules', 'dist', 'tests/e2e'],
    },
  })
);
