<template>
  <div class="ns-layout-main">
    <el-main v-loading="!loaded">
      <router-view v-slot="{ Component, route }">
        <transition name="fade-slide" mode="out-in" appear>
          <keep-alive v-if="route.meta.cache && loaded">
            <base-iframe v-if="route.meta.type === 'iframe'" :src="route.meta.src" />
            <component :is="Component" v-else :key="route.fullPath" />
          </keep-alive>
          <template v-else-if="loaded">
            <base-iframe v-if="route.meta.type === 'iframe'" :src="route.meta.src" />
            <component :is="Component" v-else :key="route.fullPath" />
          </template>
        </transition>
      </router-view>
    </el-main>
    <el-footer height="40px">
      <base-footer />
    </el-footer>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'BaseBody'
})

defineProps<{
  loaded: boolean
}>()
</script>

<style lang="scss" scoped>
.ns-layout-main {
  box-sizing: border-box;
  height: calc(100vh - var(--ns-header-height) - var(--ns-multi-tabs-height));
  overflow-x: hidden;
}

.el-main {
  display: flex;
  flex-direction: column;
  min-height: calc(100% - 40px);
  overflow: hidden;
}
</style>
