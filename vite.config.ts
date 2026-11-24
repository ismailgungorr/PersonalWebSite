import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { siteSeo } from './build/site-seo.ts'

export default defineConfig(({ command, mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    siteSeo(loadEnv(mode, process.cwd(), 'VITE_SITE_'), command === 'build'),
  ],
  server: {
    watch: {
      ignored:
        /(?:^|[/\\])(?:\.npm-cache|\.private|\.browser-tests)(?:[/\\]|$)/,
    },
    fs: {
      deny: [
        '.env',
        '.env.*',
        '*.{crt,pem,key,p12,pfx,cer,der}',
        '.npmrc',
        '.yarnrc.yml',
        '**/.git/**',
        '**/.private/**',
      ],
    },
  },
}))
