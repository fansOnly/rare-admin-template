<template>
  <el-dialog
    :model-value="modelValue"
    :title="title"
    width="30%"
    :center="false"
    :destroy-on-close="destroyOnClose"
    :draggable="draggable"
    :append-to-body="appendToBody"
    :close-on-click-modal="closeOnClickModal"
    :show-close="showClose"
    @close="onClose"
  >
    <slot />
    <template #footer>
      <span class="dialog-footer">
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
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { NOOP } from '@/utils'

interface DialogProps {
  modelValue: boolean
  title?: string
  draggable?: boolean
  showClose?: boolean
  appendToBody?: boolean
  closeOnClickModal?: boolean
  destroyOnClose?: boolean
  beforeClose?: Function | null
}

defineOptions({
  name: 'EtDialog'
})

const props = withDefaults(defineProps<DialogProps>(), {
  draggable: true,
  showClose: false,
  closeOnClickModal: false
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

const onCancel = async () => {
  // 取消事件默认不支持异步
  emit('update:modelValue', false)
  emit('cancel')
}
const onConfirm = async () => {
  doClose('confirm')
  emit('confirm')
}
</script>
