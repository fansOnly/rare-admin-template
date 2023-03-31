export interface WidgetDataType {
  id: string
  name: string
  [key: string]: any
}

export interface FormJsonType {
  widgetList: WidgetDataType[]
  formConfig: Recordable
}

export interface WidgetOptionItemType {
  text: string
  value: string | number | boolean
}

export type ScopeType = 'component' | 'global' | 'form'

// 配置项
export interface WidgetOptionType {
  name: string
  type: string
  label: string
  value: string | number | boolean
  placeholder?: string
  options?: WidgetOptionItemType[]
  scope?: ScopeType
}

export interface WidgetType {
  id: string
  name: string
  title: string
  icon?: string
  children?: WidgetType[]
}

export interface PropertyType {
  key: string
  basic: WidgetOptionType[]
  dispose: WidgetOptionItemType[]
  advance: WidgetOptionType[]
  callback: WidgetOptionType[]
}

export type EditorModeType = 'javascript' | 'json' | 'css'

export interface CodeDataType {
  visible: boolean
  value: string
  name: string
  title: string
  text?: string
  mode: EditorModeType
}
