import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: process.env.VITE_BASE || '/',
    plugins: [
      react(),
      tailwindcss(),
      {
        // Rewrites %SITE_URL% in index.html at build time so og:url and
        // og:image are absolute. Crawlers (WhatsApp, X, iMessage) do not
        // resolve relative preview URLs.
        name: 'inject-site-url',
        transformIndexHtml(html: string) {
          return html.replaceAll('%SITE_URL%', process.env.VITE_SITE_URL || '/');
        },
      },
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            firebase: ['firebase/app', 'firebase/firestore'],
            react: ['react', 'react-dom'],
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
