<template>
  <el-form :model="formData" label-width="100px" label-position="left" size="small" :rules="rules">
    <form-property-impl>
      <template #basic>
        <el-form-item label="全局组件大小" prop="size">
          <el-select v-model="formData.size" placeholder="Activity zone">
            <el-option label="Default" value="default" />
            <el-option label="Large" value="large" />
            <el-option label="Small" value="small" />
          </el-select>
        </el-form-item>
        <el-form-item label="标签位置" prop="labelPosition">
          <el-radio-group v-model="formData.labelPosition">
            <el-radio-button label="left">居左</el-radio-button>
            <el-radio-button label="right">居右</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标签对齐" prop="labelAlign">
          <el-radio-group v-model="formData.labelAlign">
            <el-radio-button label="left">居左</el-radio-button>
            <el-radio-button label="right">居右</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标签宽度" prop="labelWidth">
          <el-input-number v-model="formData.labelWidth" />
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
      <template #event>
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
    </form-property-impl>
  </el-form>
</template>

<script setup lang="ts">
import FormPropertyImpl from './form-property-impl.vue'
import type { FormRules } from 'element-plus'

defineOptions({
  name: 'FormPropertyConf'
})

const formData = reactive({
  size: 'default',
  labelPosition: 'left',
  labelAlign: 'left',
  labelWidth: 80
})

const rules = reactive<FormRules>({})

const cssData = reactive({})
const funcData = reactive({})
</script>

<style lang="scss" scoped></style>
