import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import  Components  from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(),
  Components({
    dirs: ['src/components'],
    extensions: ['ts', 'vue', 'tsx'],
    dts: 'src/components.d.ts',
    resolvers: [
      ElementPlusResolver({
        importStyle: 'sass',
        directives: true
      })
    ]
  }),
  AutoImport({
    resolvers:[ElementPlusResolver()],
    imports: ['vue'],
    dts: 'src/auto-import.d.ts'
  })
  ]
})
