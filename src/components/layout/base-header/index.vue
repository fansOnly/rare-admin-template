<template>
  <el-header class="layout-header">
    <div class="header-bar__menu-icon" @click="toggleSidebar">
      <el-icon>
        <i-ep-expand v-if="appStore.isCollapse" />
        <i-ep-fold v-else />
      </el-icon>
    </div>
    <div class="header-bar__options">
      <div class="et-icon__header">
        <el-icon>
          <i-ep-search />
        </el-icon>
      </div>
      <div class="et-icon__header" @click="toggleFullscreen">
        <el-icon>
          <i-ep-full-screen />
        </el-icon>
      </div>
      <div class="et-icon__header">
        <el-badge :value="unreadCount" :max="99">
          <el-icon style="transform: translateY(4px)">
            <i-ep-bell />
          </el-icon>
        </el-badge>
      </div>
      <div class="mode-switch">
        <el-switch
          v-model="isDark"
          inline-prompt
          :active-icon="Moon"
          :inactive-icon="Sunny"
          style="
            --et-switch-on-color: #3a3a3a;
            --et-switch-off-color: #f5f2f2;
            --et-switch-border-color: #d7d7d7;
          "
          :class="[isDark ? 'mode-switch-off' : 'mode-switch-on']"
        />
      </div>
      <el-dropdown trigger="click">
        <div class="header-bar-user">
          <el-avatar :size="30" :src="userInfo.avatar">
            <el-image :src="user" fit="contain" alt="user" />
          </el-avatar>
          <div class="header-bar-user__name">{{ userInfo.userName }}</div>
          <el-icon><i-ep-caret-bottom /></el-icon>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="user">个人信息</el-dropdown-item>
            <el-dropdown-item icon="key">修改密码</el-dropdown-item>
            <el-dropdown-item icon="switch-button" @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useFullscreen } from '@/hooks/use-fullscreen'
import { useGlobalStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'
import { useRouteStore } from '@/store/modules/route'
import { Moon, Sunny } from '@element-plus/icons-vue'
import { isDark } from '@/hooks/use-dark'
import { logout } from '@/api/core'
import { useMessage } from '@/hooks/use-message'

import user from '@/assets/images/user.png'

defineOptions({
  name: 'BaseHeader'
})

const router = useRouter()
const appStore = useGlobalStore()
const routeStore = useRouteStore()
const userStore = useUserStore()
const { useMessageBox } = useMessage()

const { userInfo } = userStore

// 侧边栏
const toggleSidebar = () => {
  appStore.toggleCollapse()
}

// 全屏
const { isFullscreen, toggle } = useFullscreen(appStore.rootEl)
const toggleFullscreen = () => toggle()
// 未读消息
const unreadCount = ref(10)

// 登出
const handleLogout = async () => {
  const confirm = await useMessageBox({
    message: '是否退出当前登录用户？'
  })
  if (confirm) {
    appStore.setGlobalLoading(true)
    const data = await logout()
    if (data.STATUS == '1') {
      userStore.logout()
      await router.push('/login')
      routeStore.clearUserRoutes()
      appStore.setGlobalLoading(false)
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--el-bg-color);
}

.header-bar__menu-icon {
  font-size: 24px;
  cursor: pointer;
}

.header-bar__options {
  display: flex;
  align-items: center;
  height: 100%;
}

.et-icon__header {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 8px;
  font-size: 24px;
  cursor: pointer;

  & .et-badge {
    transform: translateY(4px);
  }

  &:hover {
    background: #f9f9f9;
  }
}

.header-bar-user {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.header-bar-user__name {
  padding-left: 12px;
}

.mode-switch {
  padding: 0 12px;
}

:deep(.mode-switch-on) {
  & .is-icon.is-show {
    color: var(--et-color-primary);
    z-index: 2;
  }

  & .el-switch__action {
    background-color: #f5f2f2;
  }
}

:deep(.mode-switch-off) {
  & .is-icon.is-show {
    color: var(--et-color-white);
    z-index: 2;
  }

  & .el-switch__action {
    background-color: #3a3a3a;
  }
}
</style>
