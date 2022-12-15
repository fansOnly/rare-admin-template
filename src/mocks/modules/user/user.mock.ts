import { MockMethod } from 'vite-plugin-mock'
import type { ResponseData } from '@/typings/axios'

export default [
  {
    url: '/api-proxy/user/qryUserInfo',
    method: 'post',
    response: {
      STATUS: '1',
      MSG: 'success',
      userName: '@cname',
      userId: '@id',
      orgId: '@id',
      orgName: '@region',
      roleId: '@id',
      loginStatus: 'Y',
      avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    } as ResponseData
  }
] as MockMethod[]
