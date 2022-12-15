<template>
  <div class="et-layout-sidebar" :style="{ height: height + 'px' }">
    <div class="et-layout-sidebar__logo">
      <el-image
        :src="logo2"
        fit="contain"
        alt="logo"
        :class="{ 'is-height': !appStore.isCollapse }"
      />
      <div v-show="!appStore.isCollapse" class="et-layout-sidebar__title">
        {{ appStore.appName }}
      </div>
    </div>
    <el-scrollbar class="et-layout-menu" noresize>
      <el-menu
        :default-active="route.meta.id"
        :collapse="appStore.isCollapse"
        unique-opened
        :collapse-transition="false"
      >
        <template v-for="menu in routeStore.userRoutes">
          <el-menu-item
            v-if="!menu?.children?.length"
            :key="menu.menuId"
            :index="menu.menuId"
            @click="handleClickMenu(menu)"
          >
            <el-icon v-if="menu.menuIcon">
              <component :is="menu.menuIcon" />
            </el-icon>
            <span>{{ menu.menuTitle }}</span>
          </el-menu-item>
          <el-sub-menu v-else :key="menu.menuId + 'x'" :index="menu.menuId">
            <template #title>
              <el-icon v-if="menu.menuIcon">
                <component :is="menu.menuIcon" />
              </el-icon>
              <span>{{ menu.menuTitle }}</span>
            </template>
            <template v-for="second in menu.children">
              <el-menu-item
                v-if="!second?.children?.length"
                :key="second.menuId"
                :index="second.menuId"
                @click="handleClickMenu(second)"
              >
                <el-icon v-if="second.menuIcon">
                  <component :is="second.menuIcon" />
                </el-icon>
                <span>{{ second.menuTitle }}</span>
              </el-menu-item>
              <el-sub-menu v-else :key="second.menuId + 'x'" :index="second.menuId">
                <template #title>
                  <el-icon v-if="second.menuIcon">
                    <component :is="second.menuIcon" />
                  </el-icon>
                  <span>{{ second.menuTitle }}</span>
                </template>
                <el-menu-item
                  v-for="third in second.children"
                  :key="third.menuId"
                  :index="third.menuId"
                  @click="handleClickMenu(third)"
                >
                  <el-icon v-if="third.menuIcon">
                    <component :is="third.menuIcon" />
                  </el-icon>
                  <span>{{ third.menuTitle }}</span>
                </el-menu-item>
              </el-sub-menu>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useGlobalStore } from '@/store/modules/app'
import { useRouteStore } from '@/store/modules/route'

import logo2 from '@/assets/images/logo2.png'

defineOptions({
  name: 'BaseSidebar'
})

defineProps<{
  height: number
}>()

const route = useRoute()
const router = useRouter()

const appStore = useGlobalStore()
const routeStore = useRouteStore()

const handleClickMenu = (menu: Recordable) => {
  const { menuType, menuLink, path } = menu
  if (menuType === 'external-link') {
    window.open(menuLink, '_blank')
  } else {
    router.push(path)
  }
}
</script>

<style lang="scss" scoped>
.et-layout-sidebar {
  background: var(--et-menu-bg-color);
  overflow: hidden;
}

.et-layout-menu {
  height: calc(100% - var(--et-header-height));
}

.el-menu {
  border-right: 0;
}

.et-layout-sidebar__logo {
  display: flex;
  align-items: center;
  height: var(--et-header-height);
}

.is-height {
  height: 100%;
}

.et-layout-sidebar__title {
  color: #fff;
  white-space: nowrap;
}
</style>
