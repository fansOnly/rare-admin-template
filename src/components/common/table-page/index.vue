<template>
  <div class="table-page-wrapper">
    <el-form ref="formRef" :model="model" class="ns-form--search">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-row :gutter="searchConfig.layout.gutter">
            <el-col
              v-for="(item, index) in formItems"
              :key="index"
              :span="item.span || searchConfig.layout.span"
            >
              <el-form-item :label="item.label" :prop="item.prop">
                <template v-if="item.type === 'input'">
                  <el-input v-model="model[item.prop]" clearable :placeholder="item.placeholder" />
                </template>
                <template v-else-if="item.type === 'select'">
                  <el-select
                    v-model="model[item.prop]"
                    clearable
                    :placeholder="item.placeholder"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="(s, i) in item.options"
                      :key="`${index}-${i}`"
                      :label="s.label"
                      :value="s.value"
                    />
                  </el-select>
                </template>
                <template v-else-if="item.type === 'daterange'">
                  <el-date-picker
                    v-model="model[item.prop]"
                    type="daterange"
                    unlink-panels
                    range-separator="至"
                    :value-format="formItems.valueFormat || 'YYYY-MM-DD'"
                    :start-placeholder="item.placeholder[0]"
                    :end-placeholder="item.placeholder[1]"
                    :shortcuts="shortcuts"
                    clearable
                  />
                </template>
              </el-form-item>
            </el-col>
            <slot name="search" :search-model="model"></slot>
          </el-row>
        </el-col>
        <el-col :span="4">
          <slot name="button">
            <el-form-item style="margin-bottom: 0">
              <el-button type="primary" @click="submitForm(formRef)">查 询</el-button>
              <el-button @click="resetForm(formRef)">重 置</el-button>
            </el-form-item>
          </slot>
        </el-col>
      </el-row>
    </el-form>
    <div class="table-page__body">
      <div class="table-page__option">
        <slot name="bar-before"></slot>
        <el-button type="primary" @click="emit('add')">新 增</el-button>
        <el-button type="primary" @click="handleSelectAll">全 选</el-button>
        <el-button v-show="selected?.length" type="danger" @click="handleMultiDel">
          批量删除
        </el-button>
        <slot name="bar-after"></slot>
      </div>
      <div class="table-page__option-bar">
        <div v-show="selected?.length" class="table-page__option-status">
          已选择
          <span class="colored">{{ selected?.length }}</span>
          项
        </div>
      </div>
      <el-table
        ref="tableRef"
        v-loading="pagination.loading"
        :data="tableData"
        style="width: 100%"
        border
        @select="handleSelectRow"
      >
        <el-table-column v-if="tableConfig.selectable" type="selection" width="55" />
        <el-table-column
          v-for="(column, index) in tableConfig.columns"
          :key="index"
          :label="column.label"
          :property="column.prop"
          :width="column.width || 'auto'"
          :align="column.align || 'center'"
          :show-overflow-tooltip="!!column.showOverflowTooltip"
          :formatter="column.formatter"
        />
        <slot />
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <slot name="action" :scope="scope" />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="tableData.length"
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :page-sizes="pagination.pageSizes"
        :disabled="false"
        background
        hide-on-single-page
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        class="table-page__pagination"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTablePage } from './use-table-page'
import { useMessage } from '@/hooks/use-message'

import { ElTable as ElTableType } from 'element-plus'
import type { FormInstance } from 'element-plus'

defineOptions({
  name: 'TablePage'
})

const props = defineProps<{
  searchConfig: Recordable
  tableConfig: Recordable
}>()

const emit = defineEmits<{
  (e: 'select-row', selection: Recordable[], row: Recordable): void
  (e: 'add'): void
  (e: 'multi-del', value: any): void
}>()

const { useMessageBox } = useMessage()

const formRef = ref<FormInstance>()
const tableRef = ref<InstanceType<typeof ElTableType>>()

const formItems = props.searchConfig.items.filter((v: Recordable) => v.type !== 'slot')

const { model, list, pagination, loadData } = useTablePage(
  props.searchConfig.items,
  props.tableConfig.api
)

const tableData = ref(list)

const shortcuts = [
  {
    text: '近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: '近一月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  },
  {
    text: '近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    }
  }
]

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loadData(true)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const selected = computed(() => {
  return tableRef.value?.getSelectionRows()
})

const handleSelectAll = () => {
  tableRef.value!.toggleAllSelection()
}

const handleSelectRow = (selection: Recordable[], row: Recordable) => {
  emit('select-row', selection, row)
}

const handleMultiDel = async () => {
  const confirm = await useMessageBox({
    message: `正在删除 ${selected.value.length} 条信息，是否继续？`
  })
  if (confirm) {
    emit('multi-del', selected)
  }
}

defineExpose({
  loadData
})
</script>

<style lang="scss" scoped>
.ns-form--search {
  padding: var(--ns-main-padding) var(--ns-main-padding) 0;
  background: var(--el-bg-color);
  border-radius: 6px;
}

.table-page__body {
  margin-top: var(--ns-main-margin, 20px);
  padding: var(--ns-main-padding);
  background: var(--el-bg-color);
  border-radius: 6px;
}

.table-page__option {
  display: flex;
  align-items: center;
}

.table-page__option-bar {
  padding-bottom: var(--ns-main-padding);
  font-size: 14px;
  color: #666;
  text-align: left;
}

.table-page__option-status {
  margin-top: 8px;

  &.colored {
    color: var(--el-color-primary);
  }
}

.table-page__pagination {
  padding: 30px 20px;
  justify-content: center;
}
</style>
