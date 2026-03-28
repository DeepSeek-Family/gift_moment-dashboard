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
    host: "31.97.211.94",
  },
  preview: {
    host: "31.97.211.94",
    port: 9991,
  },
});