<template>
  <el-dialog :model-value="visible" :title="title" class="editor-dialog" @close="onClose">
    <div v-if="text" class="editor-bar">{{ text }}() {</div>
    <code-editor :key="codeEditorKey" :model-value="codes" :mode="mode" @change="onChange" />
    <div v-if="text" class="editor-bar">}</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import CodeEditor from './index.vue'

type EditorModeType = 'javascript' | 'json' | 'css'

defineOptions({
  name: 'CodeDialogEditor'
})

const props = withDefaults(
  defineProps<{
    visible: boolean
    codeValue: string
    title: string
    text?: string
    mode?: EditorModeType
    readonly?: boolean
  }>(),
  {
    visible: false,
    text: '',
    mode: 'javascript',
    readonly: false
  }
)
const emit = defineEmits(['update:visible', 'cancel', 'confirm'])

const codes = ref(props.codeValue)
const codeEditorKey = ref(0)

watch(
  () => props.visible,
  val => {
    if (val) {
      codes.value = props.codeValue
      codeEditorKey.value = codeEditorKey.value + 1
    }
  }
)

const onChange = (value: string) => {
  codes.value = value
}

const onConfirm = () => {
  emit('confirm', codes.value)
  onClose()
}
const onCancel = () => {
  emit('cancel')
  onClose()
}
const onClose = () => {
  emit('update:visible', false)
}
</script>

<style lang="scss" scoped>
.editor-bar {
  height: 40px;
  padding: 0 20px;
  background: #f4f4f5;
  color: #909399;
  font-size: 12px;
  line-height: 40px;
}
</style>
