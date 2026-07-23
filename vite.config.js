import { defineConfig } from "vite";
import { resolve } from "node:path";

const pages = [
  "index.html",
  "strategies.html",
  "market.html",
  "platform.html",
  "team.html",
  "contact.html",
  "projects.html",
  "project.html",
  "opportunity.html",
];

export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [page.replace(".html", ""), resolve(page)]),
      ),
    },
  },
});
