import type { AppContext } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

type MessageType = 'success' | 'warning' | 'info' | 'error'

interface MessageBoxState {
  message: string
  title?: string
  type?: MessageType
}

interface ToastState {
  message: string
  duration?: number
  type?: MessageType
}

const useMessageBox = (options: MessageBoxState, appContext?: AppContext | null) => {
  return new Promise(resolve => {
    const { message = '', title = '温馨提示', type = 'warning' } = options
    ElMessageBox.confirm(
      message,
      title,
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        showClose: false,
        draggable: false,
        closeOnClickModal: false,
        type
      },
      appContext
    )
      .then(() => {
        resolve(true)
      })
      .catch(() => {
        console.log('cancel.')
      })
  })
}

let ToastInstance: any = null

const useToast = (options: ToastState, appContext?: AppContext | null) => {
  const { message, type = 'success', duration = 1000 } = options
  ToastInstance = ElMessage[type](
    {
      showClose: true,
      message,
      duration
    },
    appContext
  )
}

const closeToast = () => {
  ToastInstance.close()
  ToastInstance = null
}

export const useMessage = () => {
  return {
    useMessageBox,
    useToast,
    closeToast
  }
}
