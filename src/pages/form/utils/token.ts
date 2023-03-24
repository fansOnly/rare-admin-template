import type { InjectionKey, Ref } from 'vue'

export interface ModuleItem {
  id: string
  [key: string]: any
}

export interface FormDesignContext {
  moduleData: Ref<Array<ModuleItem>>
  activeModuleIdx: Ref<number>
  activeModuleName: Ref<string>
  setActiveModuleIdx: (index: number) => void
  setActiveModuleName: (name: string) => void
  updateModuleData: (data: ModuleItem) => void
}

export const formDesignKey: InjectionKey<FormDesignContext> = Symbol()
