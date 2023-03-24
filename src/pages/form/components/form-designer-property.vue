<template>
  <div class="ns-form-designer-property">
    <div class="ns-fdp-bar">
      <el-tabs v-model="activeTabName" @tab-click="handleClick">
        <el-tab-pane label="组件属性" name="module"></el-tab-pane>
        <el-tab-pane label="表单属性" name="form"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="ns-fdp-main">
      <el-scrollbar :height="height - 56">
        <div class="ns-fdp-content" :style="{ 'min-height': height - 56 + 'px' }">
          <div v-show="activeTabName === 'module'">
            <form-module-conf v-if="activeModuleName" :module-name="activeModuleName" />
            <div v-else class="ns-fdp-empty">当前没有组件被选中</div>
          </div>
          <div v-show="activeTabName === 'form'">
            <form-property-conf />
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormModuleConf from './form-module-conf.vue'
import FormPropertyConf from './form-property-conf.vue'
import type { TabsPaneContext } from 'element-plus'
import { formDesignKey } from '../utils/token'

defineOptions({
  name: 'FormDesignerProperty'
})

defineProps<{
  height: number
}>()

const formDesigner = inject(formDesignKey)

const activeModuleName = formDesigner?.activeModuleName

const activeTabName = ref('module')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style lang="scss" scoped>
.ns-form-designer-property {
  min-width: var(--ns-fd-property-width);
  height: 100%;
  background: var(--el-bg-color);
}

.ns-fdp {
  &-bar {
    box-sizing: border-box;
    height: var(--ns-fd-bar-height);
    background: var(--el-bg-color);

    :deep(.el-tabs__nav-scroll) {
      margin: 0 16px;
    }
  }

  &-content {
    position: relative;
    padding: 0 16px;

    .el-collapse {
      border-top: 0;
    }
  }

  &-empty {
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    color: #bbb;
    text-align: center;
    transform: translateY(-50%);
  }
}
</style>
