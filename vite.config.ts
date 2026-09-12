import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'motion': ['framer-motion'],
          'charts': ['recharts'],
          'icons': ['lucide-react', 'react-icons'],
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
