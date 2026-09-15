import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://huement.github.io/iRock/",
  base: "/iRock",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
