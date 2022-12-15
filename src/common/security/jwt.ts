import jwt from 'jsonwebtoken'

const JWT_SIGN_KEY = 'jwt-user-secret'

export const jwtCreateToken = (data: any, options?: object) => {
  return jwt.sign(
    {
      data
    },
    JWT_SIGN_KEY,
    {
      // 设置 token 过期时间
      expiresIn: 60 * 60,
      ...options
    }
  )
}

export const jwtVerify = (token: string, options?: object) => {
  return jwt.verify(token, JWT_SIGN_KEY, options)
}

export const jwtDecode = (token: string, options?: object) => {
  return jwt.decode(token, options)
}
