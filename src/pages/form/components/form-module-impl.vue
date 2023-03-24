<template>
  <div :class="['form-module-wrap', isActive ? 'is-active' : null]" @click="onClickItem">
    <component :is="modules[name]" :index="index" />
  </div>
</template>

<script setup lang="ts">
import ModuleInput from './modules/module-input.vue'
import type { Component } from 'vue'
import { formDesignKey } from '../utils/token'

defineOptions({
  name: 'FormModuleImpl'
})

const props = defineProps<{
  moduleName: string
  index: number
}>()

const formDesigner = inject(formDesignKey)
const isActive = computed(() => formDesigner?.activeModuleIdx.value === props.index)
// const moduleId = computed(() => formDesigner?.moduleData.value[formDesigner?.activeModuleIdx.value].id)

const modules: Record<string, Component> = {
  ModuleInput
}

const name = computed(
  () => 'Module' + props.moduleName.substring(0, 1).toUpperCase() + props.moduleName.slice(1)
)

const onClickItem = () => formDesigner?.setActiveModuleIdx(props.index)
</script>

<style lang="scss" scoped>
.form-module-wrap.is-active {
  outline: 2px solid var(--el-color-primary);
}
</style>
