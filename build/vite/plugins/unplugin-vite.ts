import type { PluginOption } from 'vite'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

const srcPath = path.resolve(__dirname, '../../../src/')

export const useUnpluginVite = () => {
  const plugins: PluginOption[] = []

  // element-plus 自动导入
  plugins.push(
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        }),
        IconsResolver({
          prefix: 'Icon'
        })
      ],
      dts: path.resolve(srcPath, 'typings', 'auto-imports.d.ts')
    })
  )

  // auto typescript files
  plugins.push(
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      resolvers: [
        name => {
          if (name.toLowerCase().startsWith('fsy')) {
            return path.resolve(
              srcPath,
              `components/fsy-ui/${name.slice(3).toLowerCase()}/index.vue`
            )
          }
        },
        ElementPlusResolver({
          importStyle: 'sass'
        }),
        IconsResolver({
          enabledCollections: ['ep']
        })
      ],
      dts: path.resolve(srcPath, 'typings', 'components.d.ts')
    })
  )

  // auto install element-plus icons
  plugins.push(
    Icons({
      autoInstall: true
    })
  )

  return plugins
}
