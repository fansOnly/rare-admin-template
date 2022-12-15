import { httpPost } from '@/common/http'

enum CoreApi {
  login = '/core/login',
  logout = '/core/logout',
  qryUserRoutes = '/core/qryUserRoutes'
}

// 用户登录
export const login = <T>(params: object) => httpPost<T>(CoreApi.login, params)

// 用户登出
export const logout = <T>() => httpPost<T>(CoreApi.logout)

// 获取路由列表
export const qryUserRoutes = <T>(params: object) => httpPost<T>(CoreApi.qryUserRoutes, params)
