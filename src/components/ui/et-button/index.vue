<template>
  <div
    :class="['et-button', `et-button--${type}`, round ? `et-button--${round}` : null]"
    @click="emits('click')"
  >
    <slot name="default">{{ buttonText }}</slot>
  </div>
</template>

<script setup lang="ts">
import { NOOP } from '@/utils'

defineOptions({
  name: 'EtButton'
})

interface Props {
  type: string
  round: boolean
  buttonText: string
}
const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  round: false,
  buttonText: ''
})
const emits = defineEmits<{
  (e: 'click'): void
}>()

defineExpose(props)
</script>

<style lang="scss" scoped>
.et-button {
  width: 200px;
  height: 50px;
}
</style>
