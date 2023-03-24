<template>
  <el-container class="ns-layout-container">
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
.ns-layout-container {
  --ns-header-height: 60px;
  --ns-multi-tabs-height: 50px;
  // --ns-breadcrumb-height: 40px;
  --ns-menu-bg-color: #3c3755;
}
</style>
