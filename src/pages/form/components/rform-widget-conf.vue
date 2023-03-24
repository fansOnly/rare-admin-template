<template>
  <el-form
    :model="widgetData"
    label-width="100px"
    label-position="left"
    size="small"
    :rules="rules"
  >
    <rform-property-impl>
      <template #basic>
        <el-form-item label="组件标识" prop="id">
          <el-input v-model="widgetData.id" placeholder="请输入组件名称" disabled />
        </el-form-item>
        <template v-if="widgetOption?.basic.length">
          <el-form-item
            v-for="(item, index) in widgetOption.basic"
            :key="index"
            :label="item.label"
            :prop="item.name"
          >
            <rform-item-impl
              :widget="widgetData"
              :option="item"
              @change="onChange"
              @edit="onEdit"
            />
          </el-form-item>
        </template>
      </template>
      <template v-if="widgetOption?.dispose.length" #dispose>
        <div class="rform-dispose-list">
          <div
            v-for="(item, index) in widgetData.optionList"
            :key="index"
            class="rform-dispose-item"
          >
            <el-input
              v-model="item.text"
              placeholder="请输入选项文本"
              clearable
              class="rform-dispose-input"
            />
            <el-input
              v-model="item.value"
              placeholder="请输入选项值"
              clearable
              class="rform-dispose-input"
            />
            <el-icon
              size="20px"
              color="#ffc0c0"
              class="rform-dispose-icon--remove"
              @click="onRemoveOption(index)"
            >
              <Remove />
            </el-icon>
          </div>
        </div>
        <div class="rform-dispose-buttons">
          <el-button @click="onAddOption">添加选项</el-button>
          <el-button @click="onImportOption">导入选项</el-button>
          <el-button @click="widgetData.value = 'null'">重置选中项</el-button>
        </div>
      </template>
      <template v-if="widgetOption?.advance.length" #advance>
        <el-form-item
          v-for="(item, index) in widgetOption?.advance"
          :key="index"
          :label="item.label"
          :prop="item.name"
        >
          <rform-item-impl :widget="widgetData" :option="item" @change="onChange" @edit="onEdit" />
        </el-form-item>
      </template>
      <template v-if="widgetOption?.callback.length" #callback>
        <el-form-item
          v-for="(item, index) in widgetOption?.callback"
          :key="index"
          :label="item.label"
        >
          <rform-item-impl :widget="widgetData" :option="item" @edit="onEdit" />
        </el-form-item>
      </template>
    </rform-property-impl>
  </el-form>
</template>

<script setup lang="ts">
import RformPropertyImpl from './rform-property-impl.vue'
import RformItemImpl from './rform-item-impl.vue'
import type { FormRules } from 'element-plus'
import propertyList from './widget-property'
import { useRform } from './utils/use-rform'
const { widgetData, updateWidget } = useRform()

defineOptions({
  name: 'RformWidgetConf'
})

const rules = reactive<FormRules>({
  id: [{ required: true, message: '组件名称不能为空' }]
})

// 获取配置项
const widgetOption = computed(() => propertyList.find(v => v.key === widgetData.value.name))

const onChange = (key: string, val: string | number | boolean | undefined) => {
  widgetData.value[key] = val
  updateWidget(widgetData.value)
}

const onEdit = (name: string) => {
  console.log('编写代码片段::', name)
}

const onRemoveOption = (index: number) => {
  widgetData.value.optionList.splice(index, 1)
}
const onAddOption = () => {
  widgetData.value.optionList.push({ text: '', value: '' })
}
const onImportOption = () => {}
</script>

<style lang="scss" scoped>
.rform-dispose-item {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.rform-dispose-input {
  width: 100px;
  margin-right: 10px;
}

.rform-dispose-icon--remove:hover {
  color: #e85b5b;
  cursor: pointer;
}

.rform-dispose-buttons {
  display: flex;
  align-items: center;
  padding: 18px 0;
}
</style>
