import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://handy.computer",
  integrations: [react(), mdx()],
  adapter: cloudflare(),
  output: "server",
  build: {
    format: "file",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
  redirects: {
    "/donate": "https://donate.stripe.com/6oU4gz8762g9790c8Vffy0j",
  },
});
