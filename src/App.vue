<template>
  <el-config-provider :locale="locale" :size="config.size" :z-index="config.zIndex">
    <div
      ref="root"
      v-loading="fullscreenLoading.show"
      :element-loading-background="fullscreenLoading.background"
      :element-loading-text="fullscreenLoading.text"
    >
      <router-view></router-view>
    </div>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { useGlobalStore } from '@/store/modules/app'
import { storeToRefs } from 'pinia'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { useTitle } from '@/hooks/use-title'

const root = ref<HTMLElement | null>(null)

const appStore = useGlobalStore()
appStore.setRootEl(root as unknown as HTMLElement)

const locale = ref(zhCn)

const { config, fullscreenLoading } = storeToRefs(appStore)

useTitle()
</script>

<style>
#app {
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
  -webkit-text-size-adjust: none;
  font-feature-settings: 'tnum';
  color: #2c3e50;
  font-size: 14px;
  overflow: hidden;
}
</style>
