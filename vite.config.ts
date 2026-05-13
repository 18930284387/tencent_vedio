import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8002,
    strictPort: true,
    open: false
  },
  preview: {
    port: 8002,
    strictPort: true
  }
})