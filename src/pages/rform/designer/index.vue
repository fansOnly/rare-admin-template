<template>
  <div ref="fdRef" class="ns-form-designer-wrapper">
    <rform-widget-area :height="mainHeight" />
    <rform-main-area :height="mainHeight" />
    <rform-property-area :height="mainHeight" />
  </div>
</template>

<script setup lang="ts">
import RformWidgetArea from '../components/layouts/rform-widget-area.vue'
import RformMainArea from '../components/layouts/rform-main-area.vue'
import RformPropertyArea from '../components/layouts/rform-property-area.vue'
import { useResizeObserver } from '@vueuse/core'

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
