// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // تأكد من توجيه المسار `/api` إلى عنوان الخادم الصحيح
    },
  },
});
