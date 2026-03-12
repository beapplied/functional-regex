import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'fregex',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      output: [
        {
          format: 'es',
          entryFileNames: 'index.es.js',
          dir: 'dist',
          exports: 'named',
        },
        {
          format: 'cjs',
          entryFileNames: 'index.cjs',
          dir: 'dist',
          exports: 'named',
        },
      ],
    },
    sourcemap: true,
    minify: 'terser',
    target: 'ES2020',
  },
  test: {
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      all: true,
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
      lines: 100,
      functions: 100,
      branches: 100,
      statements: 100,
    },
  },
});
