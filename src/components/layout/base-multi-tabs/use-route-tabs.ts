import { useRouter, onBeforeRouteUpdate } from 'vue-router'

import type { RouteLocationNormalized } from 'vue-router'

interface RouteHistory {
  index: number
  value: RouteLocationNormalized
}

let uid = 0

export const useRouteTabs = () => {
  const router = useRouter()
  const historyMap = reactive(new Map<unknown, RouteHistory>())
  const currentRoute = router.currentRoute
  const routes = router.getRoutes()

  const initRouteTab = () => {
    // add affix route
    addAffixRouteTabs()
    // add current route
    addRouteTab(unref(currentRoute))
  }

  const checkRoute = (route: RouteLocationNormalized) => {
    if (!router.hasRoute(route.name!)) {
      console.error(
        `Permission denied on route ${route.path}. Please check if the route is available?`
      )
      return false
    }
    return true
  }

  const addAffixRouteTabs = () => {
    routes
      .filter(route => !!route.meta.affix)
      .forEach(route => addRouteTab(route as unknown as RouteLocationNormalized))
  }

  const addRouteTab = (route: RouteLocationNormalized) => {
    if (!checkRoute(route)) return
    historyMap.set(route.name!, {
      index: ++uid,
      value: route
    })
  }

  const removeRouteTab = (route: RouteLocationNormalized) => {
    if (!checkRoute(route)) return
    const hasTab = historyMap.get(route.name!)

    if (hasTab) {
      historyMap.delete(route.name as string)
      const lastRoute = getPrevRoute()
      routerTab(unref(lastRoute as unknown as RouteLocationNormalized))
    }
  }

  const clearTabs = (self: boolean) => {
    historyMap.clear()
    addAffixRouteTabs()
    if (!self) {
      addRouteTab(currentRoute.value)
    } else {
      const lastRoute = getPrevRoute()
      routerTab(unref(lastRoute as unknown as RouteLocationNormalized))
    }
  }

  const getPrevRoute = () => {
    let lastRoute: RouteLocationNormalized | null = null
    let i = 0
    for (const item of historyMap.values()) {
      if (item.index >= i) {
        i = item.index
        lastRoute = item.value
      }
    }
    return lastRoute
  }

  const routerTab = (to: RouteLocationNormalized) => {
    router.push(to)
  }

  initRouteTab()

  onBeforeRouteUpdate(async to => {
    addRouteTab(to)
  })

  const history = computed(() => {
    return Array.from(historyMap).map(item => item[1].value)
  })

  return {
    currentRoute,
    historyMap,
    history,
    routerTab,
    addRouteTab,
    removeRouteTab,
    clearTabs
  }
}

export const isSameRoute = (r1: RouteLocationNormalized, r2: RouteLocationNormalized) => {
  if (r1.name !== r2.name) return false
  if (r1.fullPath !== r2.fullPath) return false
  if (Object.keys(r1.query).length !== Object.keys(r2.query).length) return false
  for (const key in r1.query) {
    if (r1.query[key] !== r2.query[key]) {
      return false
    }
  }
  return true
}
