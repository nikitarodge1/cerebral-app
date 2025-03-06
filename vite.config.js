import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      fs: 'empty',
      path: 'empty',
      crypto: 'empty',
    },
  },
  optimizeDeps: {
    exclude: ['sql.js'], // Exclude sql.js from dependency optimization
  },
  build: {
    rollupOptions: {
      external: ['fs', 'path', 'crypto'], // Externalize for compatibility
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
});
