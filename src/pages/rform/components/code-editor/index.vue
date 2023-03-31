<template>
  <div ref="aceRef" class="ace-editor"></div>
</template>

<script setup lang="ts">
import ace from 'ace-builds'
import 'ace-builds/src-min-noconflict/theme-chrome' // 默认设置的主题
import 'ace-builds/src-min-noconflict/mode-javascript' // 默认设置的语言模式
import 'ace-builds/src-min-noconflict/mode-json' //
import 'ace-builds/src-min-noconflict/mode-css' //
import 'ace-builds/src-min-noconflict/ext-language_tools'

// ace.config.set('basePath', '../../../../../node_modules/ace-builds/src-min-noconflict')
ace.config.set('basePath', 'https://ks3-cn-beijing.ksyun.com/vform2021/ace-mini')

defineOptions({
  name: 'CodeEditor'
})

type EditorModeType = 'javascript' | 'json' | 'css'

const props = withDefaults(
  defineProps<{
    modelValue: string
    mode?: EditorModeType
    readonly?: boolean
  }>(),
  {
    mode: 'javascript',
    readonly: false
  }
)
const emit = defineEmits(['update:modelValue', 'change'])

const aceRef = ref<HTMLElement | null>(null)

let editor: ace.Ace.Editor

onMounted(() => {
  const el = aceRef.value
  if (el) {
    editor = ace.edit(el, {
      theme: 'ace/theme/chrome',
      mode: 'ace/mode/javascript',
      maxLines: 20, // 最大行数，超过会自动出现滚动条
      minLines: 5, // 最小行数，还未到最大行数时，编辑器会自动伸缩大小
      tabSize: 2, // 制表符设置为2个空格大小
      readOnly: props.readonly, // 设置编辑器只读
      highlightActiveLine: true, // 设置行高亮
      wrap: true, // 自动换行
      value: props.modelValue
    })

    // 代码提示和自动补全
    editor.setOptions({
      enableSnippets: true,
      enableLiveAutocompletion: true,
      enableBasicAutocompletion: true
    })

    // 设置编辑器语言模式
    if (props.mode === 'json') {
      setJsonMode()
    } else if (props.mode === 'css') {
      setCssMode()
    }

    // 开启语法检查
    editor.getSession().setUseWorker(true)

    // 双向绑定
    editor.getSession().on('change', () => {
      emit('update:modelValue', editor.getValue())
      emit('change', editor.getValue())
    })
  }
})

onBeforeUnmount(() => {
  editor.destroy()
})

const setJsonMode = () => {
  editor.getSession().setMode('ace/mode/json')
}
const setCssMode = () => {
  editor.getSession().setMode('ace/mode/css')
}
</script>

<style lang="scss" scoped>
.ace-editor {
  min-height: 300px;
}

:deep(.ace_scrollbar) {
  width: 6px;

  &::-webkit-scrollbar {
    width: 6px;

    &:horizontal {
      height: 6px;
    }

    &-thumb {
      border-radius: 5px;
      width: 6px;
      background: #b4bccc;
    }

    &-corner {
      background: #fff;
    }

    &-track {
      background: #fff;

      &-piece {
        background: #fff;
        width: 6px;
      }
    }
  }
}
</style>
