import { BaseResult } from './base-model'

type MenuTypes = 'default' | 'iframe' | 'external-link'

export type LoginParams = {
  username: string
  password: string
}

export type UserRoutesParams = {
  roleId: string
}

export interface loginModel extends BaseResult {
  token: string
}

export interface RouteListItem {
  path: string
  name: string
  sortNum: number
  status: string
  menuId: string
  component?: string
  menuIcon: string
  menuTitle: string
  menuType: MenuTypes
  parentId: string
  visible: string
  cache: string
  src?: string
  affix: string
}

export type RouteListModel = BasePageResult<RouteListItem>
