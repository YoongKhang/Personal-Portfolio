import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: '' works for deployment at a domain root (Vercel/Netlify).
// If deploying to GitHub Pages under /<repo>/, change to e.g. '/ChinYoongKhang_Portfolio/'.
export default defineConfig({
  base: '',
  plugins: [react(), tailwindcss()],
})
