import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://blogappusingmernstack-backend.onrender.com', //http://localhost:3000 Change target to the base URL of your backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});

