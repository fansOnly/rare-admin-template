<template>
  <el-form-item :label="option.label" :prop="option.name">
    <el-input v-model="widgetData[option.name]" :placeholder="option.placeholder" :min="0" />
  </el-form-item>
</template>

<script setup lang="ts">
import type { WidgetOptionType } from '../utils/types'
import { useRform } from '../utils/use-rform'
const { widgetData } = useRform()

defineOptions({
  name: 'RformInputNumber'
})

defineProps<{
  option: WidgetOptionType
}>()
</script>
