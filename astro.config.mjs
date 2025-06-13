import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://handy.computer",
  integrations: [react(), mdx()],
  output: "static", // This ensures static site generation
  build: {
    format: "file",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
