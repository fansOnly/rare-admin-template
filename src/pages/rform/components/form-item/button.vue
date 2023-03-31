<template>
  <el-form-item :label="option.label">
    <el-button type="default" round @click="onOpenCodeDialog">
      <el-icon :size="16">
        <edit />
      </el-icon>
      <span>编写{{ option.value === 'css' ? 'CSS' : '代码' }}</span>
    </el-button>
  </el-form-item>
</template>

<script setup lang="ts">
import type { WidgetOptionType } from '../utils/types'
import { useRform } from '../utils/use-rform'
const { openCodeEditor } = useRform()

defineOptions({
  name: 'RformButton'
})

const props = defineProps<{
  option: WidgetOptionType
}>()

const onOpenCodeDialog = () => {
  openCodeEditor(props.option)
}
</script>
