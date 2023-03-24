import type { ModuleItem } from './token'

export interface FormJsonType {
  widgetList: ModuleItem[]
  formConfig: Recordable
}

export interface ModuleFormType {
  id: string
  [key: string]: any
}

const formJson = reactive<FormJsonType>({
  widgetList: [],
  formConfig: {}
})
const widgetIndex = ref(-1)

export const useFormDesigner = () => {
  const activeWidget = computed(() => formJson.widgetList[widgetIndex.value])

  return {
    formJson,
    activeWidget,
    setActiveIndex,
    updateWidget
  }
}

const setActiveIndex = (index: number) => {
  console.log('激活组件 index::', index)
  widgetIndex.value = index
}

const updateWidget = (data: ModuleItem) => {
  console.log('更新数据::', data)
  formJson.widgetList[widgetIndex.value] = data
}
