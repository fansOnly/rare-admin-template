import { MockMethod } from 'vite-plugin-mock'
import { jwtCreateToken } from '@/common/security/jwt'
import { md5Encrypt } from '@/common/security/md5'

export default [
  {
    url: '/api-proxy/core/login',
    method: 'post',
    response: <T extends { body: Recordable }>(config: T) => {
      const { username, password } = config.body
      if (username == 'admin' && password === md5Encrypt('123456')) {
        const token = jwtCreateToken({ username: 'admin' })
        return {
          STATUS: '1',
          MSG: 'success',
          token
        }
      } else {
        return {
          STATUS: '003',
          MSG: '用户名或密码错误'
        }
      }
    }
  },
  {
    url: '/api-proxy/core/logout',
    method: 'post',
    response: {
      STATUS: '1',
      MSG: 'success'
    }
  }
] as MockMethod[]
