import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "api": "/src/api",
      "app": "/src/app",
      "entities": "/src/entities",
      "features": "/src/features",
      "pages": "/src/pages",
      "shared": "/src/shared",
      "widgets": "/src/widgets",
    },
  },
  server: {
    proxy: {
      '/api': {
        target: "http://localhost:5251",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        ref: true,
        svgo: true,
      },
    })
  ],
})
