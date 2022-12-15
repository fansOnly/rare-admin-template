import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import Inspect from 'vite-plugin-inspect'
import defineOptions from 'unplugin-vue-define-options/vite'
import { useCompressPlugin } from './compress'
import { useVisualizerPlugin } from './visualizer'
import { useMockPlugin } from './mock'
import { useUnpluginVite } from './unplugin-vite'

export function createVitePlugins(viteEnv: ImportMetaEnv, isBuild: boolean) {
  const {
    VITE_LEGACY,
    VITE_USE_INSPECT,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
  } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // 提供 Vue 3 单文件组件支持
    vue(),
    // 提供 Vue 3 JSX 支持
    vueJsx(),
    // use options API in <script setup>
    // usually for component name define
    defineOptions()
  ]

  vitePlugins.push(useUnpluginVite())

  // inspect 模块检查
  VITE_USE_INSPECT && vitePlugins.push(Inspect())

  // visualizer 依赖分析
  vitePlugins.push(useVisualizerPlugin())

  // 挡板数据
  vitePlugins.push(useMockPlugin(isBuild))

  if (isBuild) {
    // 为打包后的文件提供传统浏览器兼容性支持
    VITE_LEGACY && vitePlugins.push(legacy())

    // 压缩代码
    vitePlugins.push(useCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE))
  }

  return vitePlugins
}
