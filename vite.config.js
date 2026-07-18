import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves project sites under /<repo>/. Use that base only in CI;
// keep base '/' for local dev so the app is served at the site root.
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'

export default defineConfig({
  base: isGitHubPages ? '/Personal-Portfolio/' : '/',
  plugins: [react(), tailwindcss()],
})
