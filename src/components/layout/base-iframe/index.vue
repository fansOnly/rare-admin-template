<template>
  <div v-loading="loading" class="ns-iframe__wrapper">
    <iframe ref="frameRef" :src="src" class="ns-iframe" @load="hideLoading"></iframe>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

defineOptions({
  name: 'BaseIframe'
})

const props = defineProps<{
  src?: string
}>()

const { height } = useWindowSize()
const frameRef = ref<HTMLElement>()

const loading = ref(true)
const hideLoading = () => {
  loading.value = false
}

onDeactivated(() => {
  loading.value = true
})
</script>

<style lang="scss" scoped>
.ns-iframe {
  display: block;
  width: 100%;
  height: calc(100vh - var(--ns-header-height) - var(--ns-multi-tabs-height) - 80px);
  border: 0;
}
</style>
