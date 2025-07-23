// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/cabinet-quoter/', // 👈 This must match the repo name
  plugins: [react()]
})
