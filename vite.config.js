import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',  // This allows connections from any IP
    port: 3000,       // Use the desired port (default is 3000)
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Ensure this is correctly set
    },
  },
})
