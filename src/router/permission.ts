import type {
  RouteRecord,
  RouteRecordName,
  Router,
  RouteRecordNormalized,
  RouteLocationNormalized
} from 'vue-router'
import { useRouteStore } from '@/store/modules/route'
import { useUserStore } from '@/store/modules/user'
import { addUserRoutes } from './util'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

// 路由白名单
const whiteList: RouteRecordName[] = ['Login']

export const createRouterGuards = (router: Router) => {
  router.beforeEach(async (to: RouteLocationNormalized, from) => {
    console.log('to, from: ', to, from)
    NProgress.start()

    const name = to.name || ''
    const hasToken = !!sessionStorage.getItem('token')

    if (hasToken) {
      if (name === 'Login') {
        return '/index'
      }
      const userStore = useUserStore()
      if (!userStore.isLogin) {
        await userStore.getUserInfo()
      }

      const routeStore = useRouteStore()
      const userRoutes = routeStore.userRoutes

      if (!userRoutes.length) {
        try {
          await addUserRoutes(router)

          const routes: RouteRecord[] = router.getRoutes()
          const matched: RouteRecordNormalized = routes.find(v => v.path === to.path)!
          if (matched) {
            return { name: matched.name, replace: true }
          }
        } catch (error) {
          return false
        }
      }
    } else if (!whiteList.includes(name)) {
      NProgress.done()
      return to.fullPath === '/'
        ? '/login'
        : {
            path: '/login',
            query: { redirect: to.fullPath }
          }
    }
  })

  router.afterEach((to, from) => {
    NProgress.done()
  })
}
