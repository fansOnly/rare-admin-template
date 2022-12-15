import { BasePageResult, BaseResult } from './base-model'

export type IdQryParams = {
  id: string
}

export type IdListParams = {
  ids: string[]
}

export type DemoListQryParams = {
  title?: string
  status?: string | number
  type?: string
  author?: string
  createTime?: string
}

export type DemoItemParams = DemoListItem

export interface DemoListItem {
  id?: string
  title: string
  content?: string
  createTime: string
  status: string | number
  author?: string
  type?: string
}

export type DemoModel = BaseResult & DemoListItem

export type DemoListModel = BasePageResult<DemoListItem>
