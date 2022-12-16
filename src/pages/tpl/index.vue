<template>
  <div class="ns-tpl-wrapper">
    <tpl-left />
    <tpl-middle />
    <tpl-right />
  </div>
</template>

<script lang="ts" setup>
import TplLeft from './components/tpl-left/index.vue'
import TplMiddle from './components/tpl-middle/index.vue'
import TplRight from './components/tpl-right/index.vue'
</script>

<style scoped lang="scss">
.ns-tpl-wrapper {
  display: flex;
  flex: 1;
  background: var(--el-bg-color);
  box-shadow: var(--el-box-shadow-light);
}
</style>
