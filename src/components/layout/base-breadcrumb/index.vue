<template>
  <div class="breadcrumb-bar">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item in matched" :key="item.meta.id" :to="{ path: item.path }">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="ns-breadcrumb__right"></div>
  </div>
</template>

<script setup lang="ts">
import type { RouteRecordNormalized } from 'vue-router'
import { useRoute } from 'vue-router'

defineOptions({
  name: 'BaseBreadcrumb'
})

const route = useRoute()

let matched = ref<RouteRecordNormalized[]>([])
matched = computed(() => route.matched)
</script>

<style lang="scss" scoped>
.breadcrumb-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--ns-breadcrumb-height);
  padding: 0 var(--ns-main-padding);
  background: var(--el-bg-color);
  border-top: 1px solid var(--el-border-color-extra-light);
}
</style>
