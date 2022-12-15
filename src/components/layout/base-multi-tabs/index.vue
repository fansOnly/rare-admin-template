<template>
  <div class="et-multi-tabs__wrapper">
    <el-tabs
      :model-value="currentName"
      type="card"
      class="et-multi-tabs"
      @tab-click="onClickTab"
      @tab-remove="onCloseTab"
    >
      <el-tab-pane
        v-for="item in history"
        :key="item.path"
        :name="item.name"
        :closable="showCloseIcon(item)"
      >
        <template #label>
          <span class="et-multi-tabs__label">
            <span class="et-multi-tabs__text">{{ item.meta.title }}</span>
            <el-icon
              v-if="ifActiveRoute(item)"
              class="et-multi-tabs__refresh"
              @click.stop="onRefreshTab"
            >
              <Refresh />
            </el-icon>
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <div class="et-multi-tabs__more">
      <el-dropdown trigger="click" size="small" @command="onCommand">
        <el-icon>
          <MoreFilled />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="other">关闭其他页面</el-dropdown-item>
            <el-dropdown-item command="all">关闭所有页面</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computedEager } from '@vueuse/core'
import { useRouteTabs, isSameRoute } from './use-route-tabs'

import type { RouteLocationNormalized } from 'vue-router'
import type { TabsPaneContext, TabPanelName } from 'element-plus'

const emit = defineEmits<{
  (e: 'reload'): void
}>()

defineOptions({
  name: 'BaseMultiTabs'
})

const { history, currentRoute, removeRouteTab, routerTab, clearTabs } = useRouteTabs()
const currentName = computedEager(() => currentRoute.value.name as string)

const showCloseIcon = computedEager(() => {
  return (route: RouteLocationNormalized) => {
    return !route.meta.affix && history.value.length > 1
  }
})

const ifActiveRoute = computedEager(() => {
  return (route: RouteLocationNormalized) => {
    return isSameRoute(currentRoute.value, route)
  }
})

const onClickTab = (pane: TabsPaneContext, ev: Event) => {
  const toActivatedRoute = history.value.find(v => v.name === pane.paneName)
  routerTab(toActivatedRoute!)
}
const onRefreshTab = () => {
  emit('reload')
}
const onCloseTab = (name: TabPanelName) => {
  const toRemovedRoute = history.value.find(v => v.name === name)
  removeRouteTab(toRemovedRoute!)
}

const onCommand = (command: string) => {
  clearTabs(command === 'all')
}
</script>

<style lang="scss" scoped>
.et-multi-tabs__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 10px var(--et-main-padding);
  background: var(--el-bg-color);
  border-top: 1px solid var(--el-border-color-light);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  z-index: 2;

  .et-multi-tabs {
    --el-tabs-header-height: 30px;
    flex: 1;
    width: 100%;
  }

  :deep(.el-tabs__header) {
    margin-bottom: 0;
    padding: 0;
    border-bottom: 0;
  }

  :deep(.el-tabs__nav) {
    border: none;
  }

  :deep(.el-tabs__item) {
    display: inline-flex;
    align-items: center;
    margin-right: 10px;
    border-width: 1px;
    border-style: solid;
    border-color: var(--el-border-color-light);
    border-radius: 4px;

    &.is-active {
      padding-left: 13px !important;
      padding-right: 13px !important;
      background: var(--el-color-primary);
      border-color: var(--el-color-primary);
      color: var(--el-bg-color);
    }

    .is-icon-close {
      top: 0;
      margin-left: 0;
      font-size: 14px;
      transform-origin: 50% 50%;

      svg {
        margin-top: 0;
      }

      &:hover {
        background: none;
        color: var(--el-color-primary);
        transform: rotate(90deg);
      }
    }
  }

  :deep(.el-tabs--card > .el-tabs__header .el-tabs__item) {
    transition:
      // color var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier),
      padding var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);

    &:first-child {
      border-left: 1px solid var(--el-border-color-light);
    }

    &.is-active.is-closable .is-icon-close {
      width: 14px;

      &:hover {
        color: var(--el-bg-color);
      }
    }

    &.is-closable:hover {
      padding-left: 13px;
      padding-right: 13px;

      .is-icon-close {
        width: 14px;
      }
    }
  }

  :deep(.el-tabs__nav-prev) {
    top: -3px;
    font-size: 18px;
  }

  :deep(.el-tabs__nav-next) {
    top: -3px;
    font-size: 18px;
  }
}

.et-multi-tabs__label {
  display: flex;
  align-items: center;
}

.et-multi-tabs__text {
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
}

.et-multi-tabs__refresh {
  margin-left: 5px;
  font-size: 14px;
  transform-origin: 50% 50%;
  transition: all var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);

  &:hover {
    transform: rotate(90deg);
  }
}

.et-multi-tabs__more {
  width: 16px;
  margin-left: 12px;
  font-size: 16px;
  line-height: 14px;
  cursor: pointer;
}
</style>
