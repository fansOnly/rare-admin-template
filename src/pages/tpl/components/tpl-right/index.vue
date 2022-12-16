<template>
  <div class="ns-tpl-right">
    <el-tabs type="border-card" class="ns-tpl-tabs">
      <el-tab-pane v-for="item in tabs" :key="item.id" :label="item.label"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
const tabs = [
  { id: '001', label: '基本信息' },
  { id: '002', label: '规则配置' },
  { id: '003', label: '奖品设置' },
  { id: '004', label: '高级设置' }
]
</script>

<style lang="scss" scoped>
.ns-tpl-right {
  flex: 1;

  :deep(.el-tabs__nav) {
    display: flex;
    float: none;
  }

  :deep(.el-tabs__item) {
    flex: 1;
    text-align: center;
  }
}

.ns-tpl-tabs {
  --el-tabs-header-height: 60px;

  height: calc(100% - var(--el-tabs-header-height));
}
</style>
