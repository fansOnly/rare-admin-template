import type { FormJsonType, WidgetItemType } from './types'

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
const widgetIndex = ref(-1)
const widgetData = computed(() => formJson.widgetList[widgetIndex.value])
const lastWidgetIdx = computed(() => formJson.widgetList.length - 1)

export const useRform = () => {
  return {
    widgetList: formJson.widgetList,
    formConfig: formJson.formConfig,
    widgetIndex,
    widgetData,
    lastWidgetIdx,
    swapWidget,
    setActiveWidgetIdx,
    addWidget,
    updateWidget,
    removeWidget,
    updateFormConfig
  }
}

const swapWidget = (from: number, to: number) => {
  let val1: any = formJson.widgetList[from]
  let val2: any = formJson.widgetList[to]
  formJson.widgetList.splice(from, 1, val2)
  formJson.widgetList.splice(to, 1, val1)
  widgetIndex.value = to
  val1 = val2 = null
}

const setActiveWidgetIdx = (index: number) => {
  console.log('激活组件 index::', index)
  widgetIndex.value = index
}

const addWidget = (data: WidgetItemType, index: number) => {
  if (formJson.widgetList.findIndex(v => v.id === data.id) > -1) return
  console.log('添加数据::', index)
  formJson.widgetList.splice(index, 0, data)
}

const updateWidget = (data: WidgetItemType) => {
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
