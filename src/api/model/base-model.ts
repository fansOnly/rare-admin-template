export interface BaseResult {
  STATUS: string
  MSG: string
}

export interface BasePageParams {
  page: number
  pageSize: number
}

export interface BasePageResult<T> extends BaseResult {
  LIST: T[]
  HAS_NEXT: boolean
  TOTAL: number
}
