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
import type { WidgetItemType } from '../utils/types'
import { useRform } from '../utils/use-rform'
const { updateWidget } = useRform()

defineOptions({
  name: 'InputImpl'
})

const props = defineProps<{
  data: WidgetItemType
}>()

const widgetData = computed({
  get: () => props.data,
  set: val => updateWidget({ ...props.data, val })
})
</script>
