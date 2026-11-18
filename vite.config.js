import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Replaces url on specific proxy routes
// Bypasses CORS in development (not production)
const backendProxy = {
  target: 'http://localhost:4002',
  changeOrigin: true
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': backendProxy,
      '/process': backendProxy,
      '/thumbnail': backendProxy
    }
  }
})
