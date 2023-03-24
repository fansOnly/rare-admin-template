<template>
  <div class="ns-form-default-conf">
    <el-collapse v-model="activeNames">
      <el-collapse-item v-if="slots.basic" title="基本属性" name="basic">
        <slot name="basic" />
      </el-collapse-item>
      <el-collapse-item v-if="slots.advance" title="高级属性" name="advance">
        <slot name="advance" />
      </el-collapse-item>
      <el-collapse-item v-if="slots.event" title="事件属性" name="event">
        <slot name="event" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'FormPropertyImpl'
})

const slots = useSlots()

const activeNames = ref(['basic', 'advance', 'event'])
</script>

<style lang="scss" scoped>
.ns-form-default-conf {
  padding-top: 16px;

  :deep(.el-collapse-item__content) {
    padding-bottom: 0;
  }
}
</style>
