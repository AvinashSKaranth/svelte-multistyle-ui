import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  // Relative asset paths so the static export works from any subfolder/host.
  base: "./",
  build: {
    outDir: "docs",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Plain, stable filenames (no content hash) so the static export
        // is easy to host and reference directly.
        entryFileNames: "script.js",
        chunkFileNames: "chunks/[name].js",
        assetFileNames: (assetInfo) =>
          assetInfo.name && assetInfo.name.endsWith(".css")
            ? "style.css"
            : "assets/[name][extname]",
      },
    },
  },
});
