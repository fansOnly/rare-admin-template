<template>
  <el-form-item
    v-for="(option, index) in options"
    :key="index"
    :label="option.label"
    :prop="option.name"
  >
    <!-- 下拉选项 -->
    <el-select
      v-if="option.type === 'select'"
      v-model="widgetData[option.name]"
      :placeholder="option.placeholder"
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
      v-model="widgetData[option.name]"
      :placeholder="option.placeholder"
    >
      <el-radio-button v-for="(opt, sidx) in option.options" :key="sidx" :label="opt.value">
        {{ opt.text }}
      </el-radio-button>
    </el-radio-group>
    <!-- 数字输入框 -->
    <el-input-number
      v-else-if="option.type === 'inputNumber'"
      v-model="widgetData[option.name]"
      :min="0"
      :placeholder="option.placeholder"
    />
    <!-- 开关选项 -->
    <el-switch v-else-if="option.type === 'switch'" v-model="widgetData[option.name]" />
    <!-- 多行输入框 -->
    <el-input
      v-else-if="option.type === 'textarea'"
      v-model="widgetData[option.name]"
      type="textarea"
      :placeholder="option.placeholder"
    />
    <!-- 编写代码 -->
    <el-button
      v-else-if="option.type === 'button'"
      type="default"
      round
      @click="onEdit(option.name)"
    >
      <el-icon :size="16">
        <edit />
      </el-icon>
      <span>编写{{ option.value === 'css' ? 'CSS' : '代码' }}</span>
    </el-button>
    <!-- 输入框 -->
    <el-input v-else v-model="widgetData[option.name]" :placeholder="option.placeholder" />
  </el-form-item>
</template>

<script setup lang="ts">
import type { WidgetOptionType } from './utils/types'
import { useRform } from './utils/use-rform'
const { widgetData } = useRform()

defineOptions({
  name: 'RformItemImpl'
})
defineProps<{
  options: WidgetOptionType[]
}>()
const emit = defineEmits<{
  (e: 'edit', key: string): void
}>()

const onEdit = (name: string) => {
  emit('edit', name)
}
</script>
