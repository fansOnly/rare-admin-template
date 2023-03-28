<template>
  <el-form :model="widgetData" label-width="100px" label-position="left" size="small">
    <rform-property-impl>
      <template #basic>
        <el-form-item label="组件标识" prop="id" required>
          <el-input v-model="widgetData.id" placeholder="请输入组件名称" disabled />
        </el-form-item>
        <template v-if="basicConfList!.length">
          <rform-item-impl :options="basicConfList!" @edit="onEdit" />
        </template>
      </template>
      <template v-if="disposeConfList!.length" #dispose>
        <rform-option-item />
      </template>
      <template v-if="advanceConfList!.length" #advance>
        <rform-item-impl :options="advanceConfList!" @edit="onEdit" />
      </template>
      <template v-if="callbackConfList!.length" #callback>
        <rform-item-impl :options="callbackConfList!" @edit="onEdit" />
      </template>
    </rform-property-impl>
  </el-form>
</template>

<script setup lang="ts">
import RformPropertyImpl from './rform-property-impl.vue'
import RformItemImpl from './rform-item-impl.vue'
import RformOptionItem from './rform-option-item.vue'
import propertyList from './widget-property'
import { useRform } from './utils/use-rform'
const { widgetData, updateWidget } = useRform()

defineOptions({
  name: 'RformWidgetConf'
})

// 获取配置项
const widgetOption = computed(() => propertyList.find(v => v.key === widgetData.value.name))
const basicConfList = computed(() => widgetOption.value?.basic.filter(v => v.type !== 'hidden'))
const disposeConfList = computed(() => widgetOption.value?.dispose)
const advanceConfList = computed(() => widgetOption.value?.advance.filter(v => v.type !== 'hidden'))
const callbackConfList = computed(() =>
  widgetOption.value?.callback.filter(v => v.type !== 'hidden')
)

const onEdit = (name: string) => {
  console.log('编写代码片段::', name)
}
</script>

<style lang="scss" scoped></style>
