<template>
  <el-radio-group v-model="widgetData.value" :disabled="widgetData.disabled">
    <template v-if="widgetData.isButton">
      <el-radio-button v-for="(sub, sidx) in widgetData.optionList" :key="sidx" :label="sub.value">
        {{ sub.text }}
      </el-radio-button>
    </template>
    <template v-else>
      <el-radio
        v-for="(sub, sidx) in widgetData.optionList"
        :key="sidx"
        :label="sub.value"
        :border="widgetData.border"
      >
        {{ sub.text }}
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script setup lang="ts">
import type { WidgetItemType } from '../utils/types'
import { useRform } from '../utils/use-rform'
const { updateWidget } = useRform()

defineOptions({
  name: 'RadioImpl'
})
const props = defineProps<{
  data: WidgetItemType
}>()

const widgetData = computed({
  get: () => props.data,
  set: val => updateWidget({ ...props.data, val })
})
</script>
