import type {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosError,
  AxiosRequestHeaders
} from 'axios'
import axios from 'axios'
import { handleStatus } from './util'

const baseUrl = import.meta.env.VITE_API_URL
const context = import.meta.env.VITE_API_CONTEXT
const useEncrypt = import.meta.env.VITE_USE_ENCRYPT

enum RequestMethods {
  GET = 'GET',
  POST = 'POST'
}

enum ContentType {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}

// 开发模式
const isDev = import.meta.env.DEV
// 请求超时时间
const timeout = 15000
// 请求头
const headers: AxiosRequestHeaders = {
  'Content-Type': ContentType.JSON
}

const baseURL = isDev ? '/api-proxy' : baseUrl + context
console.log('[debug] 请求地址 >>>', baseUrl + context)

// axios 实例
const service: AxiosInstance = axios.create({
  baseURL,
  timeout,
  headers
})

// 刷新 token 标识
let isRefreshTokening = false
// 登录过期待重新请求接口列表
let requests: Array<Function> = []

// 接口耗时统计指针
let i = 0
let j = 0

// 请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    console.time(`├─[请求耗时@${++i}]`)
    // TODO: 扩展 config / loading 弹窗 / 打印日志 / 处理请求参数
    // console.log('config: ', config)

    // 自定义 headers
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  async (response: AxiosResponse) => {
    // TODO: 处理响应数据 / loading 弹窗 / 打印日志
    const { data, config } = response

    const params = config.data ? JSON.parse(config.data) : {}

    console.group(new Date())
    console.log('├─[请求地址]', baseUrl + context + config.url)
    console.log('├─[请求参数]', params)
    console.log('├─[响应结果]', data)
    console.timeEnd(`├─[请求耗时@${++j < i ? j : i}]`)
    console.log('└─')
    console.groupEnd()

    if (data.STATUS == '1') {
      return data
    } else if (data.STATUS === '005') {
      // 会话过期
      if (!isRefreshTokening) {
        isRefreshTokening = true
        // TODO 获取新的会话 token
        const newToken = ''
        // 用新的 token 执行缓存数组中的请求
        requests.forEach(cb => cb(newToken))
        requests = []

        return service(config)
      } else {
        // 缓存后续的请求
        return new Promise(resolve => {
          requests.push((token: string) => {
            // update token
            resolve(service(config))
          })
        })
      }
    } else {
      handleStatus(data.STATUS, data.MSG)
      return data
    }
  },
  (error: AxiosError) => {
    handleStatus(error.response!.status, error.message)
    return Promise.resolve(error)
  }
)

export const httpPost = <T>(
  url: string,
  data?: unknown,
  customHeaders?: AxiosRequestHeaders
): Promise<T> => {
  return service.request({ url, method: RequestMethods.POST, data, headers: customHeaders })
}

export const httpGet = <T>(
  url: string,
  data?: unknown,
  customHeaders?: AxiosRequestHeaders
): Promise<T> => {
  return service.request({ url, method: RequestMethods.GET, data, headers: customHeaders })
}
