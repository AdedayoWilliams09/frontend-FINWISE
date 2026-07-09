// FILE: finwise/frontend/vite.config.js
// LINE: Entire file replaced

//  Child Explanation:
// This file tells Vite how to build our app.
// We're adding Tailwind CSS to the list of tools Vite should use.

//  Technical Explanation:
// Vite configuration file - defines build settings and plugins.
// The tailwindcss plugin integrates Tailwind CSS 4.2.1 with Vite.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // This enables Tailwind CSS in our Vite build
  ],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})