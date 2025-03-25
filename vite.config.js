import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  publicDir: 'public',
  assetsInclude: ['.gltf', '.glb', '.bin'],
  build: {
    rollupOptions: {
      input: './index.html'
    },
    assetsDir: 'assets',
    copyPublicDir: true,
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 5173,
    host: true
  },
  optimizeDeps: {
    include: ['three']
  }
})