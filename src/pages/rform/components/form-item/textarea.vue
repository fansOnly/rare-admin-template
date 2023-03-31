<template>
  <el-form-item :label="option.label" :prop="option.name">
    <el-input v-model="widgetData[option.name]" type="textarea" :placeholder="option.placeholder" />
  </el-form-item>
</template>

<script setup lang="ts">
import type { WidgetOptionType } from '../utils/types'
import { useRform } from '../utils/use-rform'
const { widgetData } = useRform()

defineOptions({
  name: 'RformTextarea'
})

defineProps<{
  option: WidgetOptionType
}>()
</script>
