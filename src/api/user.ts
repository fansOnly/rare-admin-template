import { httpPost } from '@/common/http'

enum UserApi {
  qryUserInfo = '/user/qryUserInfo',
  updUserInfo = '/user/updUserInfo'
}

// 获取用户信息
export const qryUserInfo = <T>() => httpPost<T>(UserApi.qryUserInfo)
