import { EpPropMergeType } from 'element-plus/es/utils'
import { defineStore } from 'pinia'

interface AppState {
  appName: string
  rootEl: HTMLElement | null
  isFullScreen: boolean
  isCollapse: boolean
  asideWidth: string
  menuMode: string
  config: AppStateConfig
  fullscreenLoading: AppStateFullscreenLoading
  [key: string]: unknown
}

interface AppStateConfig {
  size: EpPropMergeType<StringConstructor, '' | 'default' | 'small' | 'large', never> | undefined
  zIndex: number
}

interface AppStateFullscreenLoading {
  show: boolean
  background: string
  text: string
}

export const useGlobalStore = defineStore('app', {
  state: () => {
    return {
      appName: '管理系统',
      rootEl: null, // 根节点
      isFullScreen: false, // 是否全屏
      isCollapse: false, // 是否折叠菜单
      asideWidth: '220px', // 侧边栏宽度
      menuMode: 'vertical', // horizontal
      config: {
        size: 'default', // 表单组件的默认尺寸
        zIndex: 2000 // 弹出组件的层级
      },
      fullscreenLoading: {
        // 全局 loading
        show: false,
        background: 'rgba(0, 0, 0, 0.7)',
        text: '加载中...'
      }
    } as AppState
  },
  actions: {
    setGlobalConfig(payload: AppStateConfig) {
      Object.assign(this.config, payload)
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
      const el = document.documentElement
      const compStyles = getComputedStyle(el)
      const w1 = compStyles.getPropertyValue('--el-menu-icon-width')
      const w2 = compStyles.getPropertyValue('--el-menu-base-level-padding')
      this.asideWidth = this.isCollapse ? `calc(${w1} + ${w2} * 2)` : '220px'
    },
    setRootEl(payload: HTMLElement | null) {
      this.rootEl = payload
    },
    setGlobalLoading(payload: boolean) {
      this.fullscreenLoading.show = payload
    }
  }
})
