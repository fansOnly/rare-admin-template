<template>
  <div class="ns-tpl-left">
    <div
      v-for="item in menus"
      :key="item.id"
      :class="['ns-tpl-left__item', active === item.id ? 'is-active' : null]"
      @click="handleClickMenu(item.id)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
const menus = [
  { id: '001', label: '活动页面' },
  { id: '002', label: '中奖页面' },
  { id: '003', label: '未中奖页' },
  { id: '004', label: '分享效果' }
]

const active = ref('001')

const handleClickMenu = (val: string) => {
  active.value = val
}
</script>

<style lang="scss" scoped>
.ns-tpl-left {
  width: 120px;
  padding-top: 40px;

  background: var(--el-bg-color);
  text-align: center;
}

.ns-tpl-left__item {
  position: relative;
  height: 40px;
  line-height: 40px;
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 0;
    width: 4px;
    background: var(--el-color-primary);
    opacity: 0;
    transition: opacity var(--el-transition-duration)
      var(--el-transition-function-ease-in-out-bezier);
  }

  & + & {
    margin-top: 8px;
  }

  &:hover {
    background: var(--el-color-primary-light-9);
  }

  &.is-active {
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    font-weight: 500;

    &::before {
      opacity: 1;
    }
  }
}
</style>
