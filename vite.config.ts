import path from 'path'
import { defineConfig, loadEnv } from 'vite'

import { createVitePlugins } from './build/vite/plugins'
import { createProxy } from './build/vite/proxy'
import { wrapperEnv } from './build/util'

const srcRoot = path.resolve(__dirname, 'src')

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  const { VITE_DROP_CONSOLE, VITE_API_CONTEXT, VITE_API_URL } = viteEnv
  const isBuild = command === 'build'

  return {
    resolve: {
      alias: [
        {
          find: '@',
          replacement: srcRoot
        }
      ]
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/style/element/index.scss" as *;'
        }
      }
    },
    define: {
      'process.env': {}
    },
    plugins: [...createVitePlugins(viteEnv, isBuild)],
    server: {
      host: true,
      open: true,
      proxy: createProxy([
        {
          '/api-proxy': VITE_API_URL + VITE_API_CONTEXT
        }
      ])
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        // 路由分块
        // https://rollupjs.org/guide/en/#outputmanualchunks
        output: {
          manualChunks: {
            // 'group-user': ['./src/pages/user/index']
          }
        }
      }
    },
    optimizeDeps: {
      include: ['@iconify-json/ep', '@vue/runtime-core', 'element-plus/dist/locale/zh-cn.mjs']
    }
  }
})
