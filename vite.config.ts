import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { compression } from "vite-plugin-compression2";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), compression()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    host: "localhost",
    port: 3000,
    cors: true,
  },
});
