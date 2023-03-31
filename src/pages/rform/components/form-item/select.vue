<template>
  <el-form-item :label="option.label" :prop="option.name">
    <el-select v-model="widgetData[option.name]" :placeholder="option.placeholder">
      <el-option
        v-for="(opt, sidx) in option.options"
        :key="sidx"
        :label="opt.text"
        :value="opt.value"
      />
    </el-select>
  </el-form-item>
</template>

<script setup lang="ts">
import type { WidgetOptionType } from '../utils/types'
import { useRform } from '../utils/use-rform'
const { widgetData } = useRform()

defineOptions({
  name: 'RformSelect'
})

defineProps<{
  option: WidgetOptionType
}>()
</script>
