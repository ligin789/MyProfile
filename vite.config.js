import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        // Keep the heavy 3D stack in its own chunk so it only loads
        // when the lazy Hero scene is requested.
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          motion: ['gsap', '@gsap/react', 'framer-motion', 'lenis'],
        },
      },
    },
  },
});
