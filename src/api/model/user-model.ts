import { BaseResult } from './base-model'

export interface UserModel extends BaseResult {
  userName: string
  userId: string
  orgId: string
  orgName: string
  roleId: string
  avatar?: string
}
