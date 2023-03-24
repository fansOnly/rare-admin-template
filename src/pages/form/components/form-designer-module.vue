<template>
  <div class="ns-form-designer-module">
    <div class="ns-fdm-bar">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="组件库" name="module"></el-tab-pane>
      </el-tabs>
    </div>

    <el-scrollbar :height="height - 56">
      <div class="ns-fdm-content">
        <el-collapse v-model="activeNames">
          <el-collapse-item
            v-for="item in modules"
            :key="item.id"
            :title="item.title"
            :name="item.name"
          >
            <draggable
              v-model="item.children"
              :group="{ name: 'modules', pull: 'clone', put: false }"
              item-key="id"
              :component-data="{ class: 'ns-fdm-block' }"
              :sort="false"
              ghost-class="normal-ghost"
            >
              <template #item="{ element }">
                <div class="ns-fdm-item">
                  <el-icon :size="16">
                    <component :is="element.icon"></component>
                  </el-icon>
                  <span class="ns-fdm-item__title">{{ element.title }}</span>
                </div>
              </template>
            </draggable>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus'
import draggable from 'vuedraggable'

defineOptions({
  name: 'FormDesignerModule'
})

defineProps<{
  height: number
}>()

const modules = [
  {
    id: 'm00001',
    title: '容器组件',
    name: 'container',
    children: [
      { id: 'm0000101', title: '栅格', name: 'row', icon: 'monitor' },
      { id: 'm0000102', title: '表格', name: 'table', icon: 'monitor' },
      { id: 'm0000103', title: '标签页', name: 'tabs', icon: 'monitor' },
      { id: 'm0000104', title: '卡片', name: 'card', icon: 'monitor' }
    ]
  },
  {
    id: 'm00002',
    title: '基础组件',
    name: 'basic',
    children: [
      { id: 'm0000201', title: '单行输入', name: 'input', icon: 'monitor' },
      { id: 'm0000202', title: '多行输入', name: 'textarea', icon: 'monitor' },
      { id: 'm0000203', title: '计数器', name: 'number', icon: 'monitor' },
      { id: 'm0000204', title: '单选按钮', name: 'radio', icon: 'monitor' },
      { id: 'm0000205', title: '多选按钮', name: 'checkbox', icon: 'monitor' },
      { id: 'm0000206', title: '下拉选项', name: 'select', icon: 'monitor' },
      { id: 'm0000207', title: '时间选择', name: 'time', icon: 'monitor' },
      { id: 'm0000208', title: '时间范围', name: 'time-range', icon: 'monitor' },
      { id: 'm0000209', title: '日期选择', name: 'date', icon: 'monitor' },
      { id: 'm0000210', title: '日期范围', name: 'date-range', icon: 'monitor' },
      { id: 'm0000211', title: '开关', name: 'switch', icon: 'monitor' },
      { id: 'm0000212', title: '评分选择', name: 'rate', icon: 'monitor' },
      { id: 'm0000213', title: '颜色选择器', name: 'color', icon: 'monitor' },
      { id: 'm0000214', title: '滑块', name: 'slider', icon: 'monitor' },
      { id: 'm0000215', title: '按钮', name: 'button', icon: 'monitor' },
      { id: 'm0000216', title: '分割线', name: 'divider', icon: 'monitor' },
      { id: 'm0000217', title: 'HTML', name: 'html', icon: 'monitor' },
      { id: 'm0000218', title: '静态文本', name: 'text', icon: 'monitor' }
    ]
  },
  {
    id: 'm00003',
    title: '高级组件',
    name: 'advance',
    children: [
      { id: 'm0000301', title: '图片', name: 'image', icon: 'monitor' },
      { id: 'm0000302', title: '文件', name: 'file', icon: 'monitor' },
      { id: 'm0000303', title: '富文本', name: 'editor', icon: 'monitor' },
      { id: 'm0000304', title: '级联选择器', name: 'cascader', icon: 'monitor' }
    ]
  }
]

const activeName = ref('module')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const activeNames = ref(['container', 'basic', 'advance'])
</script>

<style lang="scss" scoped>
.ns-form-designer-module {
  min-width: var(--ns-fd-module-width);
  height: 100%;
  background: var(--el-bg-color);
}

.ns-fdm {
  &-bar {
    box-sizing: border-box;
    height: var(--ns-fd-bar-height);
    background: var(--el-bg-color);

    :deep(.el-tabs__nav-scroll) {
      margin: 0 16px;
    }
  }

  &-content {
    padding: 0 16px;

    .el-collapse {
      border-top: 0;
    }
  }

  &-block {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
  }

  &-item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 5px;
    background: #f1f1f1;
    border: 1px solid #f1f1f1;

    &:active,
    &:hover {
      cursor: move;
      border-color: var(--el-color-primary);
    }

    &__title {
      margin-left: 5px;
    }
  }
}

.sortable-ghost {
  height: 0;
  padding: 0;
  border: 3px solid var(--el-color-primary);
  overflow: hidden;
}
</style>
