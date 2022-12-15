import { defineStore } from 'pinia'
import { qryUserInfo } from '@/api/user'

interface UserInfo {
  userName: string
  userId: string
  orgId: string
  orgName: string
  roleId: string
  phone?: string
  email?: string
  avatar?: string
  loginStatus?: FlagType
}
interface UserState {
  userInfo: UserInfo
}

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userInfo: {
        userName: '',
        userId: '',
        orgId: '',
        orgName: '',
        roleId: '',
        phone: '',
        email: '',
        avatar: '',
        loginStatus: 'N'
      }
    } as UserState
  },
  getters: {
    isLogin: state => state.userInfo.loginStatus === 'Y'
  },
  actions: {
    async getUserInfo() {
      const { STATUS, MSG, ...rest } = await qryUserInfo()
      if (STATUS == '1') {
        this.userInfo = rest
      }
    },
    setUserInfo(payload: UserInfo) {
      Object.assign(this.userInfo, payload)
    },
    logout() {
      this.userInfo = {
        userName: '',
        userId: '',
        orgId: '',
        orgName: '',
        roleId: '',
        phone: '',
        email: '',
        avatar: '',
        loginStatus: 'N'
      }
      sessionStorage.removeItem('token')
    }
  }
})
