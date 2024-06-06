import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/music-player/" : "/",
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});
