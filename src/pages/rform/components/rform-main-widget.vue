<template>
  <div :class="['rform-widget-wrap', isActive ? 'is-active' : null]" @click="onClickItem">
    <el-form-item
      :label="widgetData.showLabel ? widgetData.label : ''"
      :size="widgetData.size"
      :label-width="widgetData.showLabel ? widgetData.labelWidth : 'auto'"
      :required="widgetData.required"
      :class="[`is-${widgetData.labelAlign}`]"
      :prop="widgetData.name"
    >
      <component :is="widgetPropertyList[key]" :index="index" :data="widgetData" />
    </el-form-item>
    <div v-show="isActive" class="rform-widget-name">
      <el-icon size="12px">
        <Rank />
      </el-icon>
      <span class="title">{{ title }}</span>
    </div>
    <div v-show="isActive" class="rform-widget-actions">
      <el-icon @click.stop="onFocusParent">
        <Back />
      </el-icon>
      <el-icon :class="{ 'is-disabled': index === 0 }" @click.stop="onMoveUp">
        <Top />
      </el-icon>
      <el-icon :class="{ 'is-disabled': index === lastWidgetIdx }" @click.stop="onMoveDown">
        <Bottom />
      </el-icon>
      <el-icon @click.stop="onRemove">
        <Delete />
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import widgetPropertyList from './widget-impl'
import { useRform } from './utils/use-rform'
const { widgetList, widgetIndex, lastWidgetIdx, setActiveWidgetIdx, swapWidget, removeWidget } =
  useRform()

defineOptions({
  name: 'RformMainWidget'
})
const props = defineProps<{
  name: string
  title: string
  index: number
}>()
const emit = defineEmits<{
  (e: 'swap', from: number, to: number): void
  (e: 'remove', index: number): void
}>()

const key = computed(() => props.name.substring(0, 1).toUpperCase() + props.name.slice(1) + 'Impl')
const isActive = computed(() => widgetIndex.value === props.index)
const widgetData = computed(() => widgetList[props.index])

const onClickItem = () => {
  if (props.index === widgetIndex.value) return
  setActiveWidgetIdx(props.index)
}

// 编辑框操作按钮
const onFocusParent = () => {
  console.log('返回上一级')
}
const onMoveUp = () => {
  if (props.index === 0) return
  swapWidget(props.index, props.index - 1)
  emit('swap', props.index, props.index - 1)
}
const onMoveDown = () => {
  if (props.index === lastWidgetIdx.value) return
  swapWidget(props.index, props.index + 1)
  emit('swap', props.index, props.index + 1)
}
const onRemove = () => {
  removeWidget(props.index)
  emit('remove', props.index)
}
</script>

<style lang="scss" scoped>
.rform-widget {
  &-wrap {
    position: relative;

    &.is-active {
      outline: 2px solid var(--el-color-primary);
    }
  }

  &-name {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 22px;
    padding: 0 8px;
    background: var(--el-color-primary);
    color: #fff;
    opacity: 0.75;

    &:hover {
      opacity: 1;
      cursor: move;
    }

    .title {
      margin-left: 5px;
      font-size: 12px;
      transform: scale(0.9);
    }
  }

  &-actions {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    bottom: 0;
    height: 22px;
    background: var(--el-color-primary);
    color: #fff;

    .el-icon {
      margin: 0 3px;

      &.is-disabled:hover {
        cursor: not-allowed;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
}

.rform .el-form-item.is-left :deep(.el-form-item__label) {
  justify-content: flex-start;
}

.rform .el-form-item.is-center :deep(.el-form-item__label) {
  justify-content: center;
}

.rform .el-form-item.is-right :deep(.el-form-item__label) {
  justify-content: flex-end;
}
</style>
