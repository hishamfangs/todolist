import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
/** @type {import('vite').UserConfig} */

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests',
    mockReset: true,
  },
  build: {
    outDir: 'dist',
    cssCodeSplit: false,
  },
})
