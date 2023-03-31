<template>
  <draggable
    :list="widgetData.optionList"
    :group="{ name: 'options', pull: 'clone', put: false }"
    handle=".rform-dispose-icon--sort"
    item-key="id"
    :component-data="{ class: 'rform-dispose-list' }"
    chosen-class="option-chosen"
  >
    <template #item="{ element, index }">
      <div class="rform-dispose-item">
        <el-icon size="20px" class="rform-dispose-icon--sort">
          <Sort />
        </el-icon>
        <el-input
          v-model="element.text"
          placeholder="请输入选项文本"
          clearable
          class="rform-dispose-input"
        />
        <el-input
          v-model="element.value"
          placeholder="请输入选项值"
          clearable
          class="rform-dispose-input"
        />
        <el-icon
          size="20px"
          color="#ffc0c0"
          class="rform-dispose-icon--remove"
          @click="onRemove(index)"
        >
          <Remove />
        </el-icon>
      </div>
    </template>
  </draggable>
  <div class="rform-dispose-buttons">
    <el-button @click="onAdd">添加选项</el-button>
    <el-button @click="onImport">导入选项</el-button>
    <el-button @click="onReset">重置选中项</el-button>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { useRform } from './utils/use-rform'
const { widgetData } = useRform()

defineOptions({
  name: 'RformOptionItems'
})

const onRemove = (index: number) => {
  widgetData.value.optionList.splice(index, 1)
}
const onAdd = () => {
  widgetData.value.optionList.push({ text: '', value: '' })
}
const onImport = () => {}

const onReset = () => {
  widgetData.value.value = 'null'
}
</script>

<style lang="scss" scoped>
.rform-dispose-list {
  padding: 1px 1px 0;
}

.rform-dispose-item {
  display: flex;
  align-items: center;
  padding: 5px 0;
}

.rform-dispose-input {
  width: 100px;
  margin-right: 10px;
}

.rform-dispose-icon--sort {
  margin-right: 5px;
  cursor: -webkit-grabbing;
  cursor: move;
}

.rform-dispose-icon--remove:hover {
  color: #e85b5b;
  cursor: pointer;
}

.rform-dispose-buttons {
  display: flex;
  align-items: center;
  padding: 10px 0 18px;
}

.option-chosen {
  outline: 1px dashed var(--el-color-primary);
}
</style>
