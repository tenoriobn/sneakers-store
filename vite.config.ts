import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      public: path.resolve(__dirname, './public'),
    },
  },
});
