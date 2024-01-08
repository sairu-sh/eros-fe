import path from "path";
import { defineConfig } from "vite";
import VitePluginSass from "vite-plugin-sass";

export default defineConfig({
  base: "./",
  root: "./src",
  server: {
    port: 3070,
  },
  resolve: {
    alias: {
      //   "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
      "~styles": path.resolve(__dirname, "src/styles"),
    },
  },
  plugins: [VitePluginSass()],
});
