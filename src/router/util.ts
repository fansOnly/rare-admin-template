import type { defineComponent } from 'vue'
import { useRouteStore } from '@/store/modules/route'
import { useUserStore } from '@/store/modules/user'
import BlankPage from '@/components/layout/blank/index.vue'
import { qryUserRoutes } from '@/api/core'
import { BaseLayoutRoute, IFRAME } from './'
import type { Router, RouteRecordRaw, RouteMeta } from 'vue-router'

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

export interface AppRouteRecordRaw {
  name: string
  meta: RouteMeta
  component?: Component | string
  children?: AppRouteRecordRaw[]
  [key: string]: any
}

/**
 * 追加路由
 */
export const addUserRoutes = async (router: Router) => {
  const userStore = useUserStore()
  const data = await qryUserRoutes({ roleId: userStore.userInfo.roleId })
  const userRoutes = generateRoutesTree(data.LIST as unknown as AppRouteRecordRaw[], '', 3)

  if (!userRoutes.length) return false

  const routeStore = useRouteStore()
  routeStore.setUserRoutes(userRoutes)

  router.addRoute({
    ...BaseLayoutRoute,
    redirect: userRoutes[0].path,
    children: transformRouteRecord(userRoutes)
  })
}

/**
 * 转换路由对象
 */
export const transformRouteRecord = (routes: AppRouteRecordRaw[]): RouteRecordRaw[] => {
  return routes.map(route => {
    const routeRecord: RouteRecordRaw = {
      path: route.path,
      name: route.name,
      component: resolveComponent(route.component),
      redirect: route?.children?.length ? route.children[0].path : '',
      meta: {
        id: route.menuId,
        icon: route.menuIcon,
        title: route.menuTitle,
        // cache: route.cache === '1',
        cache: false,
        transition: 'fade',
        type: route.menuType,
        src: route.menuLink,
        affix: route.menuAffix === '1'
      },
      children: route?.children ? transformRouteRecord(route.children) : []
    }
    if (route.menuType === 'iframe') {
      routeRecord.component = IFRAME
    }
    return routeRecord
  })
}

// 解析组件
const pages = import.meta.glob('../pages/**/*.vue')
export const resolveComponent = (name: string) => {
  if (!name) return BlankPage
  const resolvePage = pages[`../pages/${name}/index.vue`]
  if (!resolvePage) {
    throw new Error(`Unknown page ${name}. Is it located under views with a .vue extension?`)
  }
  return resolvePage
}

/**
 * 生成路由树
 */
export const generateRoutesTree = (routes: AppRouteRecordRaw[], rootId: string, depth: number) => {
  const parentRoutes = sortRoutes(routes.filter(v => v.parentId === rootId))
  const childRoutes = routes.filter(v => v.parentId !== rootId)
  return parentRoutes.map(pRoute => {
    let children: AppRouteRecordRaw[] = []
    childRoutes.forEach(cRoute => {
      if (pRoute.menuId === cRoute.parentId) {
        children.push(cRoute)
      }
    })
    if (depth > 0) {
      children = generateRoutesTree(childRoutes, pRoute.menuId, depth - 1)
    }
    pRoute.children = sortRoutes(children)
    return pRoute
  })
}

/**
 * 路由排序
 */
export const sortRoutes = (routes: AppRouteRecordRaw[]) => {
  return routes.sort((a, b) => a.sortNum - b.sortNum)
}
