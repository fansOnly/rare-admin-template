<template>
  <div
    :class="['ns-button', `ns-button--${type}`, round ? `ns-button--${round}` : null]"
    @click="emit('click')"
  >
    <slot name="default">{{ buttonText }}</slot>
  </div>
</template>

<script setup lang="ts">
// import { NOOP } from '@/utils'

defineOptions({
  name: 'FsyButton'
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
const emit = defineEmits<{
  (e: 'click'): void
}>()

defineExpose(props)
</script>

<style lang="scss" scoped>
.ns-button {
  width: 200px;
  height: 50px;
}
</style>
