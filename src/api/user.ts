import { httpPost } from '@/common/http'
import { UserModel } from './model/user-model'

enum UserApi {
  qryUserInfo = '/user/qryUserInfo',
  updUserInfo = '/user/updUserInfo'
}

// 获取用户信息
export const qryUserInfo = () => httpPost<UserModel>(UserApi.qryUserInfo)
