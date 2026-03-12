import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import dts from 'vite-plugin-dts'

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "fregex",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      output: [
        {
          format: "es",
          entryFileNames: "index.es.js",
          dir: "dist",
          exports: "named",
        },
        {
          format: "cjs",
          entryFileNames: "index.cjs",
          dir: "dist",
          exports: "named",
        },
      ],
    },
    sourcemap: true,
    minify: "terser",
    target: "ES2020",
  },
  plugins: [dts({ tsconfigPath: './tsconfig.json', rollupTypes: true })]
});
