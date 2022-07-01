import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vitePluginBabelImport from 'vite-plugin-babel-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(),vitePluginBabelImport([
    {
      libraryName:'ant-design-vue',
      libraryDirectory:'es',
      style(name) {
        return `ant-design-vue/lib/${name}/style/index.css`
      },
    }
  ])],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
