<template>
  <div class="ns-form-designer-widget">
    <div class="ns-fdm-bar">
      <el-tabs v-model="activeTabName">
        <el-tab-pane label="组件库" name="widget"></el-tab-pane>
      </el-tabs>
    </div>

    <el-scrollbar :height="height - 56">
      <div class="ns-fdm-content">
        <el-collapse v-model="activeNames">
          <el-collapse-item
            v-for="item in widgetList"
            :key="item.id"
            :title="item.title"
            :name="item.name"
          >
            <draggable
              v-model="item.children"
              :group="{ name: 'widgets', pull: 'clone', put: false }"
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
import draggable from 'vuedraggable'
import widgetList from '../utils/widget-list'

defineOptions({
  name: 'RformWidgetArea'
})
defineProps<{
  height: number
}>()

const activeTabName = ref('widget')

const activeNames = ref(['container', 'basic', 'advance'])
</script>

<style lang="scss" scoped>
.ns-form-designer-widget {
  min-width: var(--ns-fd-widget-width);
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
