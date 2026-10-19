import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { host: '127.0.0.1', port: 6012, strictPort: true },
  preview: { host: '127.0.0.1', port: 6012, strictPort: true },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: false,
  },
})
