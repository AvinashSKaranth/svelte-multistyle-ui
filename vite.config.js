import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { fileURLToPath } from "node:url";

// https://vite.dev/config/
// All kit config (adapter, output.bundleStrategy, compilerOptions) lives in
// svelte.config.js — passing kit options here would make SvelteKit ignore that file.
export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  resolve: {
    // Generated pages keep using the package name while the gallery uses local source.
    alias: [{ find: /^svelte-multistyle-ui$/, replacement: fileURLToPath(new URL("./src/lib/index.js", import.meta.url)) }],
  },
});
