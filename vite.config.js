import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import axios from 'axios';

export default defineConfig({
  server: {
    port: 3001, // Adjust the port as needed
    proxy: {
      '/media': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
