<template>
  <el-container class="et-ns-container">
    <el-aside :width="appStore.asideWidth">
      <base-sidebar :height="height" />
    </el-aside>
    <el-container direction="vertical">
      <base-header />
      <base-multi-tabs @reload="handleReload" />
      <base-body :loaded="pageLoaded" />
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { useGlobalStore } from '@/store/modules/app'

defineOptions({
  name: 'BaseLayout'
})

const { height } = useWindowSize()
const appStore = useGlobalStore()
const pageLoaded = ref(true)

const handleReload = () => {
  pageLoaded.value = false
  nextTick(() => {
    pageLoaded.value = true
  })
}
</script>

<style lang="scss" scoped>
.et-ns-container {
  --et-header-height: 60px;
  --et-multi-tabs-height: 50px;
  // --et-breadcrumb-height: 40px;
  --et-menu-bg-color: #3c3755;
}
</style>
