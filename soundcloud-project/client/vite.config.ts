import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
    base: import.meta.env.VITE_BASE_PATH || "/",
  server: {
    proxy: {
      // proxy server
      "/api": "http://localhost:3000",
    },
    headers: {
      // headers for COOP
        "Cross-Origin-Opener-Policy": "unsafe-none",
        "Cross-Origin-Embedder-Policy": "unsafe-none"
      },
  },

  resolve: {
    // all aliases
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@library-sections": path.resolve(__dirname, "./src/compontents/pages/library/components/library-sections/"),
      "@global": path.resolve(__dirname, "./src/components/global"),
      "@redux-storage": path.resolve(__dirname, "./src/redux/storages"),
      "@redux-hook": path.resolve(__dirname, "./src/redux/hooks"),
      "@app-types": path.resolve(__dirname, "./src/app-types/loginTypes"),
      "react": path.resolve('./node_modules/react'),
      "react-dom": path.resolve('./node_modules/react-dom'),

    }
  }
})
