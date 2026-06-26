import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Food-ordering-hub/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
