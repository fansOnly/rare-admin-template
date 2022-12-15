import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { createRouterGuards } from './permission'

export const LAYOUT = () => import('@/components/layout/index.vue')
export const IFRAME = () => import('@/components/layout/base-iframe/index.vue')

// basic route
export const BaseLayoutRoute: RouteRecordRaw = {
  path: '/',
  name: 'Layout',
  component: LAYOUT,
  meta: {
    title: '首页'
  },
  children: []
}

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import('@/pages/login/index.vue')
  },
  // 路由动态渲染
  BaseLayoutRoute,
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    meta: {
      title: '页面未找到'
    },
    component: () => import('@/pages/errors/404.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(),
  routes: routes as RouteRecordRaw[],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由权限控制
createRouterGuards(router)

export default router
