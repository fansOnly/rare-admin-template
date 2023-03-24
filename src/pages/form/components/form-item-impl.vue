<template>
  <!-- 下拉选项 -->
  <el-select
    v-if="item.type === 'select'"
    :model-value="moduleForm[item.name]"
    :placeholder="item.placeholder"
    @change="onChange"
  >
    <el-option
      v-for="(opt, sidx) in item.options"
      :key="sidx"
      :label="opt.text"
      :value="opt.value"
    />
  </el-select>
  <!-- 单选按钮组 -->
  <el-radio-group
    v-else-if="item.type === 'radioButton'"
    :model-value="moduleForm[item.name]"
    :placeholder="item.placeholder"
    @change="onChange"
  >
    <el-radio-button v-for="(opt, sidx) in item.options" :key="sidx" :label="opt.value">
      {{ opt.text }}
    </el-radio-button>
  </el-radio-group>
  <!-- 数字输入框 -->
  <el-input-number
    v-else-if="item.type === 'inputNumber'"
    :model-value="moduleForm[item.name]"
    :placeholder="item.placeholder"
    @change="onChange"
  />
  <!-- 开关选项 -->
  <el-switch
    v-else-if="item.type === 'switch'"
    :model-value="moduleForm[item.name]"
    @change="onChange"
  />
  <!-- 多行输入框 -->
  <el-input
    v-else-if="item.type === 'textarea'"
    :model-value="moduleForm[item.name]"
    type="textarea"
    :placeholder="item.placeholder"
    @input="onChange"
  />
  <!-- 输入框 -->
  <el-input
    v-else
    :model-value="moduleForm[item.name]"
    :placeholder="item.placeholder"
    @input="onChange"
  />
</template>

<script setup lang="ts">
defineOptions({
  name: 'FormItemImpl'
})
const props = defineProps<{
  moduleForm: Recordable
  item: Recordable
}>()
const emit = defineEmits<{
  (e: 'change', key: string, val: string | number | boolean | undefined): void
}>()

const onChange = (val: string | number | boolean | undefined) => {
  emit('change', props.item.name, val)
}
</script>
