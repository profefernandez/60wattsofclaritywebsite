import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2500,
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate the large Spline runtime into its own chunk
          spline: ['@splinetool/react-spline', '@splinetool/runtime'],
          // React core
          react: ['react', 'react-dom', 'react-router-dom'],
          // Animation
          motion: ['framer-motion'],
        },
      },
    },
  },
});
