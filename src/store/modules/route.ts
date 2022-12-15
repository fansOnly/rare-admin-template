import { defineStore } from 'pinia'
import type { AppRouteRecordRaw } from '@/router/util'

interface RouteState {
  userRoutes: AppRouteRecordRaw[]
}

export const useRouteStore = defineStore('route', {
  state: () => {
    return {
      userRoutes: []
    } as RouteState
  },
  actions: {
    setUserRoutes(payload: AppRouteRecordRaw[]) {
      this.userRoutes = payload
    },
    clearUserRoutes() {
      this.userRoutes = []
    }
  }
})
