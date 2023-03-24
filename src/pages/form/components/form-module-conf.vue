<template>
  <el-form
    :model="moduleForm"
    label-width="100px"
    label-position="left"
    size="small"
    :rules="rules"
  >
    <form-property-impl>
      <template #basic>
        <el-form-item label="组件标识" prop="id">
          <el-input v-model="moduleForm!.id" placeholder="请输入组件名称" disabled />
        </el-form-item>
        <template v-if="propertyData?.basic.length">
          <el-form-item
            v-for="(item, index) in propertyData.basic"
            :key="index"
            :label="item.label"
            :prop="item.name"
          >
            <form-item-impl :module-form="moduleForm!" :item="item" @change="onChange" />
          </el-form-item>
        </template>
      </template>
      <template v-if="propertyData?.advance.length" #advance>
        <el-form-item
          v-for="(item, index) in propertyData?.advance"
          :key="index"
          :label="item.label"
          :prop="item.name"
        >
          <form-item-impl :module-form="moduleForm!" :item="item" @change="onChange" />
        </el-form-item>
      </template>
      <template v-if="propertyData?.event.length" #event>
        <el-form-item v-for="(item, index) in propertyData?.event" :key="index" :label="item.label">
          <el-button
            v-if="item.type === 'button'"
            type="default"
            round
            @click="onClickEditCode(item.name)"
          >
            <el-icon :size="16">
              <edit />
            </el-icon>
            <span>编写代码</span>
          </el-button>
        </el-form-item>
      </template>
    </form-property-impl>
  </el-form>
</template>

<script setup lang="ts">
import FormPropertyImpl from './form-property-impl.vue'
import FormItemImpl from './form-item-impl.vue'
import type { FormRules } from 'element-plus'
import allProperties from './properties'
import { formDesignKey } from '../utils/token'

defineOptions({
  name: 'FormModuleConf'
})

const props = defineProps<{
  moduleName: string
}>()

const formDesigner = inject(formDesignKey)

const moduleForm = computed(
  () => formDesigner?.moduleData.value[formDesigner?.activeModuleIdx.value]
)

const rules = reactive<FormRules>({
  id: [{ required: true, message: '组件名称不能为空' }]
})

// 获取配置项
const propertyData = computed(() => allProperties.find(v => v.key === props.moduleName))

const onChange = (key: string, val: string | number | boolean | undefined) => {
  moduleForm.value![key] = val
  formDesigner?.updateModuleData(moduleForm.value!)
}

const onClickEditCode = (name: string) => {
  console.log('编写代码片段::', name)
}
</script>

<style lang="scss" scoped></style>
