import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      name: "ChurchSuite",
      fileName: (format) => `churchsuite.${format}.js`,
    },
    outDir: "../dist",
    emptyOutDir: true,
  },
  root: resolve(__dirname, ".idea"),
});
