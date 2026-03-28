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
    host: "147.93.94.210",
  },
  preview: {
    host: "147.93.94.210",
    port: 9991,
  },
});