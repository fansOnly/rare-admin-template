import { useMessage } from '@/hooks/use-message'
const { useToast } = useMessage()

export const handleStatus = (status: number | string, msg: string) => {
  let errorMsg = ''

  switch (status) {
    case 400:
      errorMsg = msg
      break
    case 401:
      // clear token
      errorMsg = msg || '用户没有权限（令牌、用户名、密码错误）'
      break
    case 403:
      errorMsg = '用户得到授权，但是访问是被禁止的'
      break
    case 404:
      errorMsg = '网络请求错误,未找到该资源'
      break
    case 405:
      errorMsg = '网络请求错误，请求方法未允许'
      break
    case 408:
      errorMsg = '网络请求超时'
      break
    case 500:
      errorMsg = '服务器错误，请联系管理员'
      break
    case 501:
      errorMsg = '网络未实现'
      break
    case 502:
      errorMsg = '网络错误'
      break
    case 503:
      errorMsg = '服务不可用，服务器暂时过载或维护'
      break
    case 504:
      errorMsg = '网络超时'
      break
    case 505:
      errorMsg = 'HTTP 版本不支持该请求'
      break
    default:
      errorMsg = msg
  }

  if (errorMsg) {
    useToast({
      message: errorMsg,
      type: 'error'
    })
  }
}
