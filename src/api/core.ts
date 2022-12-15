import { httpPost } from '@/common/http'
import { BaseResult } from './model/base-model'
import { LoginParams, loginModel, RouteListModel } from './model/core-model'

import type { UserRoutesParams } from './model/core-model'

enum CoreApi {
  login = '/core/login',
  logout = '/core/logout',
  qryUserRoutes = '/core/qryUserRoutes'
}

// 用户登录
export const login = (params: LoginParams) => httpPost<loginModel>(CoreApi.login, params)

// 用户登出
export const logout = () => httpPost<BaseResult>(CoreApi.logout)

// 获取路由列表
export const qryUserRoutes = (params: UserRoutesParams) =>
  httpPost<RouteListModel>(CoreApi.qryUserRoutes, params)
