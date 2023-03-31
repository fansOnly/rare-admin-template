<template>
  <el-input
    v-model="widgetData.value"
    :type="widgetData.isPassword ? 'password' : 'text'"
    :placeholder="widgetData.placeholder"
    :is-password="widgetData.isPassword"
    :minlength="widgetData.minlength"
    :maxlength="widgetData.maxlength"
    :show-word-limit="widgetData.showWordLimit"
    :readonly="widgetData.readonly"
    :disabled="widgetData.disabled"
    :clearable="widgetData.clearable"
  />
</template>

<script setup lang="ts">
import type { WidgetDataType } from '../utils/types'

defineOptions({
  name: 'InputImpl'
})

const props = defineProps<{
  data: WidgetDataType
}>()

const widgetData = reactive(props.data)
</script>
