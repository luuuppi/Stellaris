import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@ui": path.resolve(__dirname, "./src/shared/ui/"),
      "@api": path.resolve(__dirname, "./src/shared/api/"),
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
