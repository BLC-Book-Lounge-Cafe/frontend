import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr"

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "app": "/src/app",
      "entities": "/src/entities",
      "features": "/src/features",
      "pages": "/src/pages",
      "shared": "/src/shared",
      "widgets": "/src/widgets",
    },
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
