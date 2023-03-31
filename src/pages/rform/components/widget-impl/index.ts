import type { Component } from 'vue'
import InputImpl from './input-impl.vue'
import RadioImpl from './radio-impl.vue'

const widgetPropertyList: Recordable<Component> = {
  InputImpl,
  RadioImpl
}

export default widgetPropertyList
