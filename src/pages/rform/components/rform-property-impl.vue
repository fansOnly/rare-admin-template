<template>
  <div class="ns-form-default-conf">
    <el-collapse v-model="activeNames">
      <el-collapse-item v-if="slots.basic" title="基本属性" name="basic">
        <slot name="basic" />
      </el-collapse-item>
      <el-collapse-item v-if="slots.dispose" title="选项配置" name="dispose">
        <slot name="dispose" />
      </el-collapse-item>
      <el-collapse-item v-if="slots.advance" title="高级属性" name="advance">
        <slot name="advance" />
      </el-collapse-item>
      <el-collapse-item v-if="slots.callback" title="事件属性" name="callback">
        <slot name="callback" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'RformPropertyImpl'
})

const slots = useSlots()

const activeNames = ref(['basic', 'advance', 'dispose', 'callback'])
</script>

<style lang="scss" scoped>
.ns-form-default-conf {
  padding-top: 16px;

  :deep(.el-collapse-item__content) {
    padding-bottom: 0;
  }
}
</style>
