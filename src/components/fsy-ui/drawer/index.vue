<template>
  <div class="ns-drawer-wrapper">
    <el-drawer
      :model-value="modelValue"
      :size="size"
      :title="title"
      :direction="direction"
      :close-on-click-modal="clickOnClickModal"
      :show-close="showClose"
      @close="onClose"
    >
      <template #default>
        <slot />
      </template>
      <template #footer>
        <el-button :loading="isSyncCancel" :disabled="isSyncConfirm" @click="onCancel">
          取 消
        </el-button>
        <el-button
          :loading="isSyncConfirm"
          :disabled="isSyncCancel"
          type="primary"
          @click="onConfirm"
        >
          确 认
        </el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
type directionType = 'rtl' | 'ltr' | 'ttb' | 'btt'

interface DrawerProps {
  modelValue: boolean
  title: string
  size?: string | number
  direction?: directionType
  clickOnClickModal?: boolean
  showClose?: boolean
  appendToBody?: boolean
  beforeClose?: Function | null
}

defineOptions({
  name: 'FsyDrawer'
})

const props = withDefaults(defineProps<DrawerProps>(), {
  size: '30%',
  clickOnClickModal: false,
  showClose: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'cancel'): void
  (e: 'confirm'): void
  (e: 'close'): void
}>()

const isSyncConfirm = ref(false)
const isSyncCancel = ref(false)

const hide = (shouldCancel?: boolean) => {
  isSyncConfirm.value = isSyncCancel.value = false
  if (shouldCancel) return
  emit('update:modelValue', false)
}

const doClose = (type?: string) => {
  if (props.beforeClose) {
    if (type === 'confirm') {
      isSyncConfirm.value = true
    } else if (type === 'cancel') {
      isSyncCancel.value = true
    }
    props.beforeClose(hide)
  } else {
    emit('update:modelValue', false)
  }
}

// 关闭时会默认调用这个函数
const onClose = () => {
  emit('close')
}

const onCancel = () => {
  // 取消事件默认不支持异步
  emit('update:modelValue', false)
  emit('cancel')
}
const onConfirm = () => {
  doClose('confirm')
  emit('confirm')
}
</script>

<style lang="scss" scoped>
.ns-drawer-wrapper {
  :deep(.el-drawer__header) {
    margin-bottom: var(--ns-main-margin);
  }

  :deep(.el-drawer__body) {
    border-top: 1px solid var(--el-border-color);
  }

  :deep(.el-drawer__footer) {
    padding: var(--el-drawer-padding-primary);
    border-top: 1px solid var(--el-border-color);
  }
}
</style>
