<template>
  <div class="ns-form-designer-container">
    <div class="ns-fdc-bar">
      <div class="ns-fdc-bar__left">
        <el-button type="primary" text>
          <el-icon :size="18">
            <Back />
          </el-icon>
        </el-button>
        <el-button type="primary" text>
          <el-icon :size="18">
            <Right />
          </el-icon>
        </el-button>
        <div class="ns-fdc-bar__client">
          <el-radio-group v-model="formConfig.layoutType" size="default">
            <el-radio-button label="PC" />
            <el-radio-button label="PAD" />
            <el-radio-button label="H5" />
          </el-radio-group>
        </div>
      </div>
      <div class="ns-fdc-bar__right">
        <el-button type="primary" text>
          <el-icon :size="18">
            <Delete />
          </el-icon>
          <span>清空</span>
        </el-button>
        <el-button type="primary" text>
          <el-icon :size="18">
            <View />
          </el-icon>
          <span>预览</span>
        </el-button>
        <el-button type="primary" text>导入JSON</el-button>
        <el-button type="primary" text>导出JSON</el-button>
        <el-button type="primary" text>导出代码</el-button>
      </div>
    </div>
    <el-form
      :size="formConfig.size"
      :label-position="formConfig.labelPosition"
      :label-width="formConfig.labelWidth"
      :class="['rform', `is-${formConfig.labelAlign}`]"
    >
      <el-scrollbar :height="height - 40">
        <div class="ns-fdc-main">
          <div :class="['is-' + formConfig.layoutType.toLowerCase()]">
            <draggable
              :list="usedWidgetList"
              group="widgets"
              handle=".rform-widget-name"
              item-key="id"
              :component-data="{
                class: 'ns-fdc-content',
                style: { 'min-height': height - (formConfig.layoutType === 'PC' ? 56 : 72) + 'px' }
              }"
              @change="onDragChange"
            >
              <template #item="{ element, index }">
                <rform-main-widget
                  :name="element.name"
                  :title="element.title"
                  :index="index"
                  @swap="onSwap"
                  @remove="onRemove"
                />
              </template>
            </draggable>
            <div v-if="!usedWidgetList.length" class="ns-fdc-empty">
              请从左侧列表中选择一个组件, 然后用鼠标拖动组件放置于此处
            </div>
          </div>
        </div>
      </el-scrollbar>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import RformMainWidget from '../rform-main-widget.vue'
import draggable from 'vuedraggable'
import propertyList from '../widget-property'
import { useId } from '@/hooks'
import type { WidgetType, WidgetDataType } from '../utils/types'
import { useRform } from '../utils/use-rform'
const { formConfig, setActiveWidgetIdx, addWidget, swapWidget } = useRform()

defineOptions({
  name: 'RformMainArea'
})

defineProps<{
  height: number
}>()

const usedWidgetList = ref<WidgetType[]>([])
let uid = useId().value

const onDragChange = (evt: any) => {
  // console.log('onDragChange evt: ', evt)
  if (evt.added) {
    const { element, newIndex } = evt.added
    console.log('[added]: ', element, '[at]', newIndex)
    setActiveWidgetIdx(newIndex)
    initWidgetData(element.id, element.name, newIndex)
  } else if (evt.moved) {
    const { element, newIndex, oldIndex } = evt.moved
    console.log('[moved]: ', element.name, '[from] ', newIndex, '[to] ', oldIndex)
    swapWidget(oldIndex, newIndex)
  }
}

const onSwap = (from: number, to: number) => {
  let val1: any = usedWidgetList.value[from]
  let val2: any = usedWidgetList.value[to]
  usedWidgetList.value.splice(from, 1, val2)
  usedWidgetList.value.splice(to, 1, val1)
  val1 = val2 = null
}

const onRemove = (index: number) => {
  usedWidgetList.value.splice(index, 1)
}

const cached: Recordable<WidgetDataType> = {}

const initWidgetData = (id: string, name: string, index: number) => {
  // TODO 缓存优化
  if (cached[id]) return addWidget({ ...cached[id], id: uuid() }, index)
  // 获取配置项
  const widgetOption = propertyList.find(v => v.key === name)
  // 初始化配置项表单值
  if (!widgetOption) {
    return console.warn(`It seems ${name} config data is missing.`)
  }
  const moduleForm: WidgetDataType = {
    id: uuid(),
    name
  }
  widgetOption.basic.forEach(item => {
    moduleForm[item.name] = item.type === 'button' ? '' : item.value
  })
  widgetOption.advance.forEach(item => {
    moduleForm[item.name] = item.type === 'button' ? '' : item.value
  })
  if (widgetOption.dispose.length) {
    moduleForm.optionList = widgetOption.dispose
  }
  widgetOption.callback.forEach(item => {
    moduleForm[item.name] = ''
  })
  // 简单深拷贝
  cached[id] = JSON.parse(JSON.stringify(moduleForm))
  addWidget(moduleForm, index)
}

const uuid = () => {
  const arr = uid.split('-')
  let current = +arr[arr.length - 1]
  current++
  arr[arr.length - 1] = current + ''
  return (uid = arr.join('-'))
}
</script>

<style lang="scss" scoped>
.ns-form-designer-container {
  flex: 1;
}

.ns-fdc {
  &-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    height: var(--ns-fd-bar-height);
    padding: 0 20px;
    background: var(--el-bg-color);
    border: 1px dashed #f1f1f1;
    line-height: var(--ns-fd-bar-height);

    &__left {
      display: flex;
      align-items: center;
      color: var(--el-color-primary);
    }

    &__right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .el-button {
      padding-left: 0;
      padding-right: 0;

      &:hover,
      &:focus {
        background: none;
        opacity: 0.75;
      }
    }

    &__client {
      display: flex;
      align-items: center;
      margin-left: 20px;
    }
  }

  &-main {
    position: relative;
    margin: 16px 16px 0;

    .is-pc {
      height: 100%;
      background: var(--el-bg-color);
    }

    .is-pad {
      max-width: 960px;
      height: 100%;
      margin: 0 auto;
      padding: 3px;
      background: var(--el-bg-color);
      border-radius: 15px;
      box-shadow: 0 0 1px 10px #495060;
    }

    .is-h5 {
      max-width: 420px;
      height: 100%;
      margin: 0 auto;
      padding: 3px;
      background: var(--el-bg-color);
      border-radius: 15px;
      box-shadow: 0 0 1px 10px #495060;
    }
  }

  &-content {
    box-sizing: border-box;
    height: 100%;
    padding: 16px;
  }

  &-empty {
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    color: #bbb;
    text-align: center;
    transform: translateY(-50%);
  }
}

.rform.is-left :deep(.el-form-item__label) {
  justify-content: flex-start;
}

.rform.is-center :deep(.el-form-item__label) {
  justify-content: center;
}

.rform.is-right :deep(.el-form-item__label) {
  justify-content: flex-end;
}
</style>
