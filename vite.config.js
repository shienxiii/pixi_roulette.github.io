import { defineConfig } from "vite";


export default defineConfig({
  base: "/pixi_roulette/",

  build: {
    outDir: "docs",
    sourcemap: true,
  },
});