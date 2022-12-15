<template>
  <div class="demo-icons-wrapper">
    <div v-for="item in iconList" :key="item" class="demo-icon" @click="handleClickItem(item)">
      <el-icon :size="24">
        <component :is="item"></component>
      </el-icon>
      <div class="demo-icon-name">{{ item }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const iconList = reactive(Object.keys(ElementPlusIconsVue))

const { text, copy, isSupported } = useClipboard()

const handleClickItem = (value: string) => {
  if (isSupported) {
    copy(value)
    ElMessage({
      message: 'Copied!',
      grouping: true,
      type: 'success'
    })
  }
}
</script>

<style lang="scss" scoped>
.demo-icons-wrapper {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 16px;
}

.demo-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
}

.demo-icon-name {
  margin-top: 8px;
  font-size: 12px;
}
</style>
