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
    port: 5173,
    host: "localhost",
  },
  preview: {
    host: "0.0.0.0",
    port: 5173,
    allowedHosts: ["admin.giftmoment.tech"],
  },
});
