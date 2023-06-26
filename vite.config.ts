import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Unocss from 'unocss/vite'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import PostcssPxToViewport from 'postcss-px-to-viewport'

import legacy from '@vitejs/plugin-legacy'
import imagemin from 'unplugin-imagemin/vite'
import { compression } from 'vite-plugin-compression2'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    vue(),
    Layouts(),
    Pages(),
    Unocss(),
    VueI18n({
      include: 'locales/*.y(a)?ml',
    }),
    AutoImport({
      dts: 'src/auto-imports.d.ts',
      imports: [
        'vue',
        'vue-router',
        'vue-i18n',
        '@vueuse/head',
        '@vueuse/core',
        {
          '~/utils/request': [
            ['default', 'request'],
          ],
        },
        {
          '~/modules/dayjs': [
            ['default', 'dayjs'],
          ],
        },
        {
          vant: [
            'showToast',
            'showDialog',
            'showNotify',
            'showImagePreview',
          ],
        },
      ],
      dirs: [
        'src/composables',
        'src/stores',
      ],
      vueTemplate: true,
    }),
    Components({
      dts: 'src/components.d.ts',
      resolvers: [VantResolver()],
    }),

    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    imagemin(),
    compression(),
  ],
  css: {
    postcss: {
      plugins: [
        PostcssPxToViewport({
          viewportWidth: 375,
          viewportUnit: 'vw',
          // exclude: [/node_modules\/vant/i],
        }),
      ],
    },
  },
  server: {
    host: '0.0.0.0',
    port: 80,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },

  preview: {
    host: '0.0.0.0',
    port: 8080,
  },

  build: {
    outDir: 'dist',
  },
})
