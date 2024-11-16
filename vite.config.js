import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import ElementPlus from 'unplugin-element-plus/vite';

export default defineConfig({
  plugins: [
    vue(),
    ElementPlus()
  ],
  server: {
    port: 5173,
    host: true
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.message?.includes('ResizeObserver')) {
          return;
        }
        warn(warning);
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    chunkSizeWarningLimit: 1600
  }
});