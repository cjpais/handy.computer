import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const autolinkConfig = [
  rehypeAutolinkHeadings,
  {
    behavior: "append",
    properties: {
      className: ["heading-anchor"],
      ariaHidden: true,
      tabIndex: -1,
    },
    content: {
      type: "element",
      tagName: "span",
      properties: { className: ["heading-anchor-icon"] },
      children: [{ type: "text", value: "#" }],
    },
  },
];

export default defineConfig({
  site: "https://handy.computer",
  integrations: [react(), mdx({ rehypePlugins: [rehypeSlug, autolinkConfig] })],
  markdown: {
    shikiConfig: {
      theme: "gruvbox-light-hard",
    },
    rehypePlugins: [rehypeSlug, autolinkConfig],
  },
  output: "static",
  build: {
    format: "file",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
});
