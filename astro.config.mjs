import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { unified } from '@astrojs/markdown-remark';

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
  integrations: [react(), mdx()],
  experimental: {
    incrementalBuild: true,
  },
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeSlug, autolinkConfig],
    }),
    shikiConfig: {
      theme: "gruvbox-light-hard",
    },
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
