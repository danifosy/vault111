import { defineConfig } from 'vite';
import dotenv from 'dotenv';
dotenv.config;
import reactRefresh from '@vitejs/plugin-react-refresh';

const { PORT = 3001 } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  servre: {
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist/app',
  },
});
