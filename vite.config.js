import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    vue({
      reactivityTransform: true,
    }),
  ],
    //proxy server
    server: {
      proxy: {
        "/graphql": {
          target: "https://venia.magento.com",
          changeOrigin: true,
        },
      },
    },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/_variables.scss";',
          javascriptEnabled: true
        }
      }
    }
  }
})
