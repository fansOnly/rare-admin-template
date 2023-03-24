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
          <el-radio-group v-model="layoutType" size="default">
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
      </div>
    </div>
    <el-form>
      <el-scrollbar :height="height - 40">
        <div class="ns-fdc-main">
          <div :class="['is-' + layoutType.toLowerCase()]">
            <draggable
              :list="usedModules"
              group="modules"
              item-key="id"
              :component-data="{
                class: 'ns-fdc-content',
                style: { 'min-height': height - (layoutType === 'PC' ? 56 : 72) + 'px' }
              }"
              @change="onDragChange"
            >
              <template #item="{ element, index }">
                <form-module-impl :module-name="element.name" :index="index" />
              </template>
            </draggable>
            <div v-if="!usedModules.length" class="ns-fdc-empty">
              请从左侧列表中选择一个组件, 然后用鼠标拖动组件放置于此处
            </div>
          </div>
        </div>
      </el-scrollbar>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import formModuleImpl from './form-module-impl.vue'
import draggable from 'vuedraggable'
import { formDesignKey } from '../utils/token'
import allProperties from './properties'
import { useId } from '@/hooks'
import type { ModuleFormType } from '../utils/types'

defineOptions({
  name: 'FormDesignerContainer'
})

defineProps<{
  height: number
}>()

const formDesigner = inject(formDesignKey)

const usedModules = ref([])
const layoutType = ref('PC')

const uid = useId().value
const uuid = ref(uid)

const onDragChange = (evt: any) => {
  // console.log('onDragChange evt: ', evt)
  if (evt.added) {
    const { element, newIndex } = evt.added
    console.log('added: ', element.name, newIndex)
    formDesigner?.setActiveModuleIdx(newIndex)
    formDesigner?.setActiveModuleName(element.name)
    // 获取配置项
    const propertyData = computed(() => allProperties.find(v => v.key === element.name))
    // 初始化配置项表单值
    if (!propertyData) {
      return console.warn(`It seems ${element.name} config data is missing.`)
    }
    const moduleForm = reactive<ModuleFormType>({
      id: increaseId()
    })
    moduleForm.id = uuid.value
    propertyData.value!.basic.forEach(item => {
      moduleForm[item.name] = item.value
    })
    propertyData.value!.advance.forEach(item => {
      moduleForm[item.name] = item.value
    })
    formDesigner?.updateModuleData(moduleForm)
  } else if (evt.moved) {
    const { element, newIndex, oldIndex } = evt.moved
    console.log('moved: ', element.name, newIndex, oldIndex)
  }
}

const increaseId = () => {
  const arr = uuid.value.split('-')
  let current = +arr[arr.length - 1]
  current++
  arr[arr.length - 1] = current + ''
  return (uuid.value = arr.join('-'))
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
</style>
