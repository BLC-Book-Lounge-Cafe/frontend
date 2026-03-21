import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "app": "/src/app",
      "entities": "/src/entities",
      "features": "/src/features",
      "pages": "/src/pages",
      "shared": "/src/shared",
    },
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})
