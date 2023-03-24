export default {
  key: 'input',
  basic: [
    {
      name: 'label',
      type: 'input',
      label: '标签文本',
      value: 'input',
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
      name: 'isPassword',
      type: 'switch',
      label: '是否密码框',
      value: false
    },
    // {
    //   name: 'showPassword',
    //   type: 'switch',
    //   label: '切换密码显示',
    //   value: false
    // },
    { name: 'value', type: 'input', label: '默认值', value: '', placeholder: '请输入默认值' },
    {
      name: 'placeholder',
      type: 'input',
      label: '占位内容',
      value: '',
      placeholder: '请输入占位内容'
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
    { name: 'clearable', type: 'switch', label: '可清除', value: true },
    { name: 'readonly', type: 'switch', label: '只读', value: false },
    { name: 'disabled', type: 'switch', label: '禁用', value: false }
  ],
  advance: [
    { name: 'hide', type: 'switch', label: '隐藏组件', value: false },
    { name: 'minlength', type: 'inputNumber', label: '最小长度', value: 0, placeholder: '' },
    { name: 'maxlength', type: 'inputNumber', label: '最大长度', value: 10, placeholder: '' },
    { name: 'showWordLimit', type: 'switch', label: '显示字数统计', value: false }
  ],
  event: [
    { name: 'created', type: 'button', label: 'onCreated' },
    { name: 'mounted', type: 'button', label: 'onMounted' },
    { name: 'input', type: 'button', label: 'onInput' },
    { name: 'change', type: 'button', label: 'onChange' },
    { name: 'focus', type: 'button', label: 'onFocus' },
    { name: 'blur', type: 'button', label: 'onBlur' },
    { name: 'clear', type: 'button', label: 'onClear' }
  ]
}
