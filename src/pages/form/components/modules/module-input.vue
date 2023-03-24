<template>
  <el-form-item
    :label="moduleForm!.showLabel ? moduleForm!.label : ''"
    :size="moduleForm!.size"
    :label-width="moduleForm!.showLabel ? moduleForm!.labelWidth : 'auto'"
    :required="moduleForm!.required"
    :class="[`is-${moduleForm!.labelAlign}`]"
    :prop="moduleForm!.name"
  >
    <el-input
      v-model="moduleForm!.value"
      :type="moduleForm!.isPassword ? 'password' : 'text'"
      :placeholder="moduleForm!.placeholder"
      :is-password="moduleForm!.isPassword"
      :minlength="moduleForm!.minlength"
      :maxlength="moduleForm!.maxlength"
      :show-word-limit="moduleForm!.showWordLimit"
      :readonly="moduleForm!.readonly"
      :disabled="moduleForm!.disabled"
      :clearable="moduleForm!.clearable"
    />
  </el-form-item>
</template>

<script setup lang="ts">
import { formDesignKey } from '../../utils/token'

defineOptions({
  name: 'ModuleInput'
})

const props = defineProps<{
  index: number
}>()

const formDesigner = inject(formDesignKey)
const moduleForm = computed(() => formDesigner?.moduleData.value[props.index])
</script>

<style lang="scss" scoped>
.el-form-item.is-left :deep(.el-form-item__label) {
  justify-content: flex-start;
}

.el-form-item.is-center :deep(.el-form-item__label) {
  justify-content: center;
}

.el-form-item.is-right :deep(.el-form-item__label) {
  justify-content: flex-end;
}
</style>
