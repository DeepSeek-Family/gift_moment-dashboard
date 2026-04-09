import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: 9991,
    host: "92.205.184.238",
  },
  preview: {
    host: "92.205.184.238",
    port: 9991,
  },
});