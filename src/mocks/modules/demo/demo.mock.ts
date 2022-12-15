import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'
import type { ResponseData } from '@/typings/axios'

let TOTAL_DEF = 276

const mockTableData = (page: number, pageSize: number, total: number): Recordable[] => {
  const max = ~~(total / pageSize)
  const lastData = total % pageSize
  const res = Mock.mock({
    ['LIST|' + (page < max ? pageSize : lastData)]: [
      {
        id: '@id',
        title: '@ctitle',
        content: '@cword(5, 30)',
        status: '@pick(["0", "1", "2"])',
        type: '@pick(["hot", "tech", "sport"])',
        author: '@cname',
        createTime: '@datetime'
      }
    ]
  })
  return res.LIST
}

export default [
  {
    url: '/api-proxy/demo/qryDemoList',
    method: 'post',
    timeout: 500,
    response: (config: any): ResponseData => {
      const { page, pageSize } = config.body
      const LIST = mockTableData(page, pageSize, TOTAL_DEF)
      return {
        STATUS: '1',
        MSG: 'success',
        TOTAL: TOTAL_DEF,
        HAS_NEXT: true,
        LIST
      }
    }
  },
  {
    url: '/api-proxy/demo/qryDemo',
    method: 'post',
    timeout: 100,
    response: {
      STATUS: '1',
      MSG: 'success',
      id: '@id',
      title: '@ctitle',
      content: '@cword(10,20)',
      status: 1,
      type: 'hot',
      author: '@cname',
      createTime: '@datetime'
    } as ResponseData
  },
  {
    url: '/api-proxy/demo/addDemo',
    method: 'post',
    timeout: 500,
    response: (): ResponseData => {
      ++TOTAL_DEF
      return {
        STATUS: '1',
        MSG: 'success'
      }
    }
  },
  {
    url: '/api-proxy/demo/updateDemo',
    method: 'post',
    timeout: 500,
    response: (): ResponseData => {
      return {
        STATUS: '1',
        MSG: 'success'
      }
    }
  },
  {
    url: '/api-proxy/demo/delDemo',
    method: 'post',
    timeout: 100,
    response: (config: any): ResponseData => {
      const { ids } = config.body
      TOTAL_DEF -= ids.length
      return {
        STATUS: '1',
        MSG: 'success'
      }
    }
  }
] as MockMethod[]
