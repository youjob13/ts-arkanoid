import { defineConfig } from "vite";
import { NodePackageImporter } from "sass-embedded";

export default defineConfig({
    root: "src",
    appType: "spa",
    base: "/ts-arkanoid",
    build: {
        cssMinify: true,
        outDir: "../dist",
        minify: "esbuild",
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern",
                importers: [new NodePackageImporter()],
            },
        },
    },
    dev: {
        sourcemap: true,
    },
});
