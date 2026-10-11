import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const packageJson = JSON.parse(
  readFileSync(path.resolve(rootDir, "package.json"), "utf8")
);

export default defineConfig({
  root: __dirname,
  plugins: [react()],
  resolve: {
    alias: {
      [packageJson.name]: path.resolve(rootDir, "dist/index.esm.js"),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: path.resolve(rootDir, "docs-dist"),
    emptyOutDir: true,
  },
});
