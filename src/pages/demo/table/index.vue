<template>
  <div>
    <table-page
      ref="tablePageRef"
      :search-config="searchConfig"
      :table-config="tableConfig"
      @multi-del="handleMultiDel"
      @add="handleAdd"
    >
      <template #search="{ searchModel }">
        <el-col :span="6">
          <el-form-item label="内容" prop="content">
            <el-input v-model="searchModel.content" clearable placeholder="请输入内容" />
          </el-form-item>
        </el-col>
      </template>
      <template #action="{ scope }">
        <el-button type="primary" icon="edit" size="small" plain @click="handleEdit(scope.row)">
          编辑
        </el-button>
        <el-button type="danger" icon="delete" size="small" plain @click="handelDelete(scope.row)">
          删除
        </el-button>
      </template>
    </table-page>
    <!-- 抽屉 -->
    <et-drawer
      v-model="visible"
      title="这是一个异步确认抽屉示例"
      size="50%"
      :before-close="handleBeforeClose"
    >
      <el-form ref="modelRef" :model="editModel" :rules="rules" :label-width="80">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="标题" prop="title">
              <el-input v-model="editModel.title" clearable placeholder="请输入标题" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类型" prop="type">
              <el-select
                v-model="editModel.type"
                clearable
                placeholder="请选择类型"
                style="width: 100%"
              >
                <el-option label="热点" value="hot" />
                <el-option label="科技" value="tech" />
                <el-option label="体育" value="sport" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间" prop="createTime">
              <el-date-picker
                v-model="editModel.createTime"
                type="daterange"
                unlink-panels
                range-separator="至"
                value-format="YYYY-MM-DD"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容" prop="content">
              <el-input
                v-model="editModel.content"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                clearable
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select
                v-model="editModel.status"
                clearable
                placeholder="请选择状态"
                style="width: 100%"
              >
                <el-option
                  v-for="(item, index) in STATUS_LIST"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </et-drawer>
  </div>
</template>

<script setup lang="ts">
import { qryDemoList, addDemo, updateDemo, deleteDemo } from '@/api/demo'
import { mappingText } from '@/utils'
import { useMessage } from '@/hooks/use-message'

import type { FormInstance } from 'element-plus'
import TablePage from '@/components/common//table-page/index.vue'

interface TableItem {
  id: string
  title: string
  content: string
  type: string
  createTime: string
  status: string
}

const { useMessageBox, useToast } = useMessage()

const STATUS_LIST = [
  { label: '全部', value: '' },
  { label: '下架', value: '0' },
  { label: '上架', value: '1' },
  { label: '置顶', value: '2' }
]

const tablePageRef = ref<InstanceType<typeof TablePage>>()
const visible = ref(false)

const searchConfig = {
  layout: {
    gutter: 8,
    span: 6,
    labelWidth: 100
  },
  items: [
    {
      label: '标题',
      prop: 'title',
      value: '',
      type: 'input',
      placeholder: '请输入标题'
    },
    {
      label: '状态',
      prop: 'status',
      value: '',
      type: 'select',
      placeholder: '请选择状态',
      options: STATUS_LIST
    },
    {
      span: 12,
      label: '创建时间',
      prop: 'createTime',
      type: 'daterange',
      placeholder: ['开始日期', '结束日期'],
      value: ''
    },
    {
      prop: 'content',
      value: '',
      type: 'slot'
    }
  ]
}
const tableConfig = {
  api: qryDemoList,
  columns: [
    {
      label: '标题',
      prop: 'title',
      align: 'left'
    },
    {
      label: '简介',
      prop: 'content',
      width: '350',
      align: 'left',
      showOverflowTooltip: true
    },
    {
      label: '类型',
      prop: 'type',
      width: '100'
    },
    {
      label: '发布人',
      prop: 'author',
      width: '100'
    },
    {
      label: '创建时间',
      prop: 'createTime',
      width: '165'
    },
    {
      label: '状态',
      prop: 'status',
      width: '100',
      formatter(row: any, column: any, cellValue: string) {
        return mappingText(STATUS_LIST, cellValue)
      }
    }
  ],
  selectable: true
}

const rules = reactive({
  title: [{ required: true, message: '请选择状态', trigger: 'change' }],
  status: [{ required: true, message: '请选择状态', trigger: 'change' }],
  createTime: [{ required: true, message: '请选择时间', trigger: 'change' }]
})
const modelRef = ref<FormInstance>()
let editModel = reactive({}) as TableItem
let flag = ''

const handleAdd = () => {
  flag = 'add'
  visible.value = true
}

const handleEdit = (row: TableItem) => {
  editModel = row
  flag = 'edit'
  visible.value = true
}

const handelDelete = async (row: TableItem) => {
  const confirm = await useMessageBox({ message: '正在删除 1 条信息，是否继续？' })
  if (confirm) {
    await deleteDemo({ ids: [row.id] })
    reload()
  }
}

const handleMultiDel = async (rows: any) => {
  const ids = rows.value.map((row: { id: any }) => row.id)
  await deleteDemo({ ids })
  reload()
}

const reload = () => tablePageRef.value!.loadData()

const handleBeforeClose = async (done: (shouldCancel?: boolean) => void) => {
  await modelRef.value!.validate(async (valid, fields) => {
    if (valid) {
      let res
      if (flag === 'add') {
        res = await addDemo({ ...editModel })
      } else if (flag === 'edit') {
        res = await updateDemo({ ...editModel })
      }
      if (res?.STATUS == '1') {
        useToast({ message: '交易成功' })
        flag = ''
        reload()
        done()
      }
    } else {
      console.log('error submit!', fields)
      done(true)
    }
  })
}
</script>
