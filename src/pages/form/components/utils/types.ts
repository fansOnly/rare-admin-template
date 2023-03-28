export interface WidgetItemType {
  id: string
  name: string
  [key: string]: any
}

export interface FormJsonType {
  widgetList: WidgetItemType[]
  formConfig: Recordable
}

export interface WidgetOptionItemType {
  text: string
  value: string | number | boolean
}

export interface WidgetOptionType {
  name: string
  type: string
  label: string
  value: string | number | boolean
  placeholder?: string
  options?: WidgetOptionItemType[]
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
