import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: './',  // Ensure relative paths in production
  build: {
    outDir: 'dist', // Output folder for production
  },
  plugins: [react()],
});
