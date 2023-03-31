<template>
  <el-form-item :label="option.label" :prop="option.name">
    <el-radio-group v-model="widgetData[option.name]" :placeholder="option.placeholder">
      <el-radio-button v-for="(opt, sidx) in option.options" :key="sidx" :label="opt.value">
        {{ opt.text }}
      </el-radio-button>
    </el-radio-group>
  </el-form-item>
</template>

<script setup lang="ts">
import type { WidgetOptionType } from '../utils/types'
import { useRform } from '../utils/use-rform'
const { widgetData } = useRform()

defineOptions({
  name: 'RformRadioButtonGroup'
})

defineProps<{
  option: WidgetOptionType
}>()
</script>
