<template>
  <div ref="fdRef" class="ns-form-designer-wrapper">
    <form-designer-module :height="mainHeight" />
    <form-designer-container :height="mainHeight" />
    <form-designer-property :height="mainHeight" />
  </div>
</template>

<script setup lang="ts">
import FormDesignerModule from '../components/form-designer-module.vue'
import FormDesignerContainer from '../components/form-designer-container.vue'
import FormDesignerProperty from '../components/form-designer-property.vue'
import { useResizeObserver } from '@vueuse/core'
import type { ModuleItem } from '../utils/token'
import { formDesignKey } from '../utils/token'

const fdRef = ref<HTMLElement | null>(null)
const mainHeight = ref(0)

onMounted(() => {
  const el = fdRef.value
  if (el) {
    useResizeObserver(el, entries => {
      const entry = entries[0]
      const { height } = entry.contentRect
      mainHeight.value = height
    })
  }
})

// 共享的数据
const moduleData = ref<ModuleItem[]>([])
const activeModuleIdx = ref(-1)
const activeModuleName = ref('')
const setActiveModuleIdx = (index: number) => {
  console.log('激活组件 index::', index)
  activeModuleIdx.value = index
}
const setActiveModuleName = (name: string) => {
  console.log('激活组件 name::', name)
  activeModuleName.value = name
}
const updateModuleData = (data: ModuleItem) => {
  console.log('更新数据::', data)
  moduleData.value[activeModuleIdx.value] = data
  console.log('moduleData: ', moduleData.value)
}

provide(formDesignKey, {
  moduleData,
  activeModuleIdx,
  activeModuleName,
  setActiveModuleIdx,
  setActiveModuleName,
  updateModuleData
})
</script>

<style lang="scss" scoped>
.ns-form-designer-wrapper {
  --ns-fd-bar-height: 40px;
  --ns-fd-module-width: 260px;
  --ns-fd-property-width: 300px;

  display: flex;
  height: calc(100vh - var(--ns-header-height) - var(--ns-multi-tabs-height) - 80px);
}
</style>
