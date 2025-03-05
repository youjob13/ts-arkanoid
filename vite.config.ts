import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  appType: "spa",
  build: {
    cssMinify: true,
    outDir: "../dist",
    minify: "esbuild",
  },
  dev: {
    sourcemap: true,
  },
});
