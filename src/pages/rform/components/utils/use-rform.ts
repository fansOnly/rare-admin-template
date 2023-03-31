import type {
  FormJsonType,
  WidgetDataType,
  WidgetOptionType,
  ScopeType,
  EditorModeType,
  CodeDataType
} from './types'

// 全数据
const formJson = reactive<FormJsonType>({
  widgetList: [],
  formConfig: {
    layoutType: 'PC',
    size: 'default',
    labelPosition: 'left',
    labelAlign: 'left',
    labelWidth: 80
  }
})
// 激活的小组件索引
const widgetIndex = ref(-1)
// 代码编辑器对象
const codeData: CodeDataType = reactive({
  visible: false,
  value: '',
  name: '',
  title: '',
  text: '',
  mode: 'javascript'
})

export const useRform = () => {
  const widgetData = computed(() => formJson.widgetList[widgetIndex.value])
  const lastWidgetIdx = computed(() => formJson.widgetList.length - 1)

  return {
    widgetList: formJson.widgetList,
    formConfig: formJson.formConfig,
    widgetIndex,
    widgetData,
    lastWidgetIdx,
    codeData,
    swapWidget,
    setActiveWidgetIdx,
    addWidget,
    updateWidget,
    removeWidget,
    updateFormConfig,
    openCodeEditor,
    updateCodeData
  }
}

watch(
  () => formJson,
  val => {
    console.log('[debug] widgetData', val.widgetList)
  },
  { deep: true }
)

const swapWidget = (from: number, to: number) => {
  let val1: any = formJson.widgetList[from]
  let val2: any = formJson.widgetList[to]
  formJson.widgetList.splice(from, 1, val2)
  formJson.widgetList.splice(to, 1, val1)
  widgetIndex.value = to
  val1 = val2 = null
}

const setActiveWidgetIdx = (index: number) => {
  console.time('activated')
  console.log('激活组件 index::', index)
  widgetIndex.value = index
  nextTick(() => {
    console.timeEnd('activated')
  })
}

const addWidget = (data: WidgetDataType, index: number) => {
  if (formJson.widgetList.findIndex(v => v.id === data.id) > -1) return
  console.log('添加数据::', index)
  formJson.widgetList.splice(index, 0, data)
}

const updateWidget = (data: WidgetDataType) => {
  console.log('更新数据::', data)
  formJson.widgetList[widgetIndex.value] = data
}

const removeWidget = (index: number) => {
  console.log('移除数据::', index)
  formJson.widgetList.splice(index, 1)
  // fix active index
  if (widgetIndex.value >= formJson.widgetList.length) {
    setActiveWidgetIdx(formJson.widgetList.length - 1)
  }
}

const updateFormConfig = (data: Recordable) => {
  formJson.formConfig = data
}

const updateCodeData = (value: string) => {
  const widget = formJson.widgetList[widgetIndex.value]
  widget[codeData.name] = value
}

const openCodeEditor = (option: WidgetOptionType) => {
  const widget = formJson.widgetList[widgetIndex.value]
  codeData.name = option.name
  codeData.value = widget[option.name]
  codeData.title = genCodeDialogTitle(option.scope!, option.value as string)
  codeData.text =
    option.scope === 'component' && option.value === 'javascript'
      ? `${widget.id}.${option.name}`
      : ''
  codeData.mode = option.value as EditorModeType
  codeData.visible = true
}

const genCodeDialogTitle = (scope: ScopeType, value: string) => {
  const t1 = scope === 'component' ? '组件' : scope === 'form' ? '表单' : '全局'
  const t2 = value === 'css' ? ' CSS' : '事件函数'
  return t1 + t2
}
