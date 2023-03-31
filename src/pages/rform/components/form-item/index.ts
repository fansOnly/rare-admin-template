import type { Component } from 'vue'
import RformInputText from './input-text.vue'
import RformInputNumber from './input-number.vue'
import RformTextarea from './textarea.vue'
import RformSelect from './select.vue'
import RformRadioButtonGroup from './radio-button-group.vue'
import RformSwitch from './switch.vue'
import RformButton from './button.vue'

const rformItemList: Recordable<Component> = {
  RformInputText,
  RformInputNumber,
  RformSelect,
  RformTextarea,
  RformRadioButtonGroup,
  RformSwitch,
  RformButton
}

export default rformItemList
