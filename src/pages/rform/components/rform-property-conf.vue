<template>
  <el-form
    :model="formConfig"
    label-width="100px"
    label-position="left"
    size="small"
    :rules="rules"
  >
    <rform-property-impl>
      <template #basic>
        <el-form-item label="全局组件大小" prop="size">
          <el-select v-model="formConfig.size" placeholder="Activity zone">
            <el-option label="Default" value="default" />
            <el-option label="Large" value="large" />
            <el-option label="Small" value="small" />
          </el-select>
        </el-form-item>
        <el-form-item label="标签位置" prop="labelPosition">
          <el-radio-group v-model="formConfig.labelPosition">
            <el-radio-button label="left">居左</el-radio-button>
            <el-radio-button label="top">居上</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标签对齐" prop="labelAlign">
          <el-radio-group v-model="formConfig.labelAlign">
            <el-radio-button label="left">居左</el-radio-button>
            <el-radio-button label="center">居中</el-radio-button>
            <el-radio-button label="right">居右</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标签宽度" prop="labelWidth">
          <el-input-number v-model="formConfig.labelWidth" />
        </el-form-item>
        <el-form-item label="表单全局样式">
          <el-button type="default" round>
            <el-icon :size="16">
              <edit />
            </el-icon>
            <span>编写CSS</span>
          </el-button>
        </el-form-item>
      </template>
      <template #callback>
        <el-form-item label="onFormCreated">
          <el-button type="default" round>
            <el-icon :size="16">
              <edit />
            </el-icon>
            <span>编写代码</span>
          </el-button>
        </el-form-item>
        <el-form-item label="onFormMounted">
          <el-button type="default" round>
            <el-icon :size="16">
              <edit />
            </el-icon>
            <span>编写代码</span>
          </el-button>
        </el-form-item>
      </template>
    </rform-property-impl>
  </el-form>
</template>

<script setup lang="ts">
import RformPropertyImpl from './rform-property-impl.vue'
import type { FormRules } from 'element-plus'
import { useRform } from './utils/use-rform'
const { formConfig } = useRform()

defineOptions({
  name: 'RformPropertyConf'
})

const rules = reactive<FormRules>({})
</script>

<style lang="scss" scoped></style>
