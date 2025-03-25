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
  assetsInclude: ['.gltf', '.glb', '.bin', '.png', '.jpg', '.jpeg', '.svg'],
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
    host: true,
    fs: {
      strict: false
    }
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
    exclude: ['@react-three/drei']
  },
  base: '/'
})