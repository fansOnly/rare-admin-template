<template>
  <!-- 下拉选项 -->
  <el-select
    v-if="option.type === 'select'"
    :model-value="widget[option.name]"
    :placeholder="option.placeholder"
    @change="onChange"
  >
    <el-option
      v-for="(opt, sidx) in option.options"
      :key="sidx"
      :label="opt.text"
      :value="opt.value"
    />
  </el-select>
  <!-- 单选按钮组 -->
  <el-radio-group
    v-else-if="option.type === 'radioButton'"
    :model-value="widget[option.name]"
    :placeholder="option.placeholder"
    @change="onChange"
  >
    <el-radio-button v-for="(opt, sidx) in option.options" :key="sidx" :label="opt.value">
      {{ opt.text }}
    </el-radio-button>
  </el-radio-group>
  <!-- 数字输入框 -->
  <el-input-number
    v-else-if="option.type === 'inputNumber'"
    :model-value="widget[option.name]"
    :min="0"
    :placeholder="option.placeholder"
    @change="onChange"
  />
  <!-- 开关选项 -->
  <el-switch
    v-else-if="option.type === 'switch'"
    :model-value="widget[option.name]"
    @change="onChange"
  />
  <!-- 多行输入框 -->
  <el-input
    v-else-if="option.type === 'textarea'"
    :model-value="widget[option.name]"
    type="textarea"
    :placeholder="option.placeholder"
    @input="onChange"
  />
  <!-- 编写代码 -->
  <el-button v-else-if="option.type === 'button'" type="default" round @click="onEdit(option.name)">
    <el-icon :size="16">
      <edit />
    </el-icon>
    <span>编写{{ option.value === 'css' ? 'CSS' : '代码' }}</span>
  </el-button>
  <!-- 输入框 -->
  <el-input
    v-else-if="option.type === 'input'"
    :model-value="widget[option.name]"
    :placeholder="option.placeholder"
    @input="onChange"
  />
  <!-- 其他 -->
  <slot v-else />
</template>

<script setup lang="ts">
import type { WidgetOptionType, WidgetItemType } from './utils/types'

defineOptions({
  name: 'RformItemImpl'
})
const props = defineProps<{
  widget: WidgetItemType
  option: WidgetOptionType
}>()
const emit = defineEmits<{
  (e: 'change', key: string, val: string | number | boolean | undefined): void
  (e: 'edit', key: string): void
}>()

const onChange = (val: string | number | boolean | undefined) => {
  emit('change', props.option.name, val)
}
const onEdit = (name: string) => {
  emit('edit', name)
}
</script>
