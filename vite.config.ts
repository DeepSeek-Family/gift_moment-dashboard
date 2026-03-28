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
    // proxy: {
    //   '/api': {
    //     target: 'http://10.10.7.44:9990',
    //     changeOrigin: true,
  //     secure: false,
    //   }
    // },
    host: "31.97.211.94",
    port: 9991,
  },
});
