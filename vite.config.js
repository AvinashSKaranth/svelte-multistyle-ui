import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";

// https://vite.dev/config/
// All kit config (adapter, output.bundleStrategy, compilerOptions) lives in
// svelte.config.js — passing kit options here would make SvelteKit ignore that file.
export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
});