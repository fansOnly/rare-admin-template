import type { PropertyType } from '../utils/types'

export default {
  key: 'radio',
  basic: [
    {
      name: 'label',
      type: 'input',
      label: '标签文本',
      value: 'radio',
      placeholder: '请输入标签文本'
    },
    {
      name: 'labelAlign',
      type: 'radioButton',
      label: '标签对齐',
      options: [
        { text: '居左', value: 'left' },
        { text: '居中', value: 'center' },
        { text: '居右', value: 'right' }
      ],
      value: 'left',
      placeholder: ''
    },
    {
      name: 'size',
      type: 'select',
      label: '组件尺寸',
      options: [
        { text: 'Default', value: 'default' },
        { text: 'Large', value: 'large' },
        { text: 'Small', value: 'small' }
      ],
      value: 'default',
      placeholder: ''
    },
    { name: 'value', type: 'hidden', label: '默认值', value: 'null', placeholder: '' },
    { name: 'isButton', type: 'switch', label: '按钮样式', value: false },
    { name: 'border', type: 'switch', label: '是否显示边框', value: false },
    { name: 'labelWidth', type: 'inputNumber', label: '标签宽度', value: 80, placeholder: '' },
    { name: 'showLabel', type: 'switch', label: '显示标签文本', value: true },
    { name: 'required', type: 'switch', label: '是否必填', value: false },
    {
      name: 'requiredMsg',
      type: 'input',
      label: '必填校验提示',
      value: '',
      placeholder: '请输入必填校验提示'
    },
    {
      name: 'errorMsg',
      type: 'input',
      label: '校验失败提示',
      value: '',
      placeholder: '请输入校验失败提示'
    },
    { name: 'disabled', type: 'switch', label: '禁用', value: false },
    { name: 'customStyle', type: 'button', label: '自定义样式', value: 'css' }
  ],
  dispose: [
    { text: 'radio1', value: '1' },
    { text: 'radio2', value: '2' },
    { text: 'radio3', value: '3' }
  ],
  advance: [],
  callback: [
    { name: 'onCreated', type: 'button', label: 'onCreated', value: 'js' },
    { name: 'onMounted', type: 'button', label: 'onMounted', value: 'js' },
    { name: 'onChange', type: 'button', label: 'onChange', value: 'js' }
  ]
} as PropertyType
