import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion'],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // makes the server accessible externally
    port: 5175, // optional, you can set the port
    allowedHosts: [
      'nonhostile-londa-wheaten.ngrok-free.dev', // allow your ngrok hostname
      'released-portfolio.onrender.com', // allow Render deployment
      'localhost',
      '127.0.0.1'
    ]
  }
})
