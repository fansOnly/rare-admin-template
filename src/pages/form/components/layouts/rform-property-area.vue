<template>
  <div class="ns-form-designer-property">
    <div class="ns-fdp-bar">
      <el-tabs v-model="activeTabName">
        <el-tab-pane label="组件属性" name="widget"></el-tab-pane>
        <el-tab-pane label="表单属性" name="form"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="ns-fdp-main">
      <el-scrollbar :height="height - 56">
        <div class="ns-fdp-content" :style="{ 'min-height': height - 56 + 'px' }">
          <div v-show="activeTabName === 'widget'">
            <rform-widget-conf v-if="widgetIndex > -1" />
            <div v-else class="ns-fdp-empty">请选择组件配置属性</div>
          </div>
          <div v-show="activeTabName === 'form'">
            <rform-property-conf />
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import RformWidgetConf from '../rform-widget-conf.vue'
import RformPropertyConf from '../rform-property-conf.vue'
import { useRform } from '../utils/use-rform'
const { widgetIndex } = useRform()

defineOptions({
  name: 'RformPropertyArea'
})

defineProps<{
  height: number
}>()

const activeTabName = ref('widget')

watch(
  () => widgetIndex.value,
  val => {
    if (val > -1 && activeTabName.value === 'form') {
      activeTabName.value = 'widget'
    }
  }
)
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
