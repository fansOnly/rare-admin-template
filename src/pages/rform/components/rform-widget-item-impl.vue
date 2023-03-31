<template>
  <template v-for="(option, index) in options" :key="index">
    <component :is="RformItemList[`Rform${humpNaming(option.type)}`]" :option="option" />
  </template>
</template>

<script setup lang="ts">
import RformItemList from './form-item'
import { humpNaming } from './utils/util'
import type { WidgetOptionType } from './utils/types'

defineOptions({
  name: 'RformWidgetItemImpl'
})
defineProps<{
  options: WidgetOptionType[]
}>()
</script>
