import { App, ComponentPublicInstance } from 'vue'

const scriptErrorHandler = (
  event: Event | string,
  source?: string,
  lineno?: number,
  colno?: number,
  error?: Error
) => {
  console.log('[debug] window onerror => ', error)
}

const registerResourceErrorHandler = () => {
  window.addEventListener('error', event => {
    console.log('[debug] error => ', event)
  })
}

const registerPromiseErrorHandler = () => {
  window.addEventListener('unhandledrejection', event => {
    console.log('[debug] unhandledrejection => ', event)
  })
}

const vueErrorHandler = (err: unknown, instance: ComponentPublicInstance | null, info: string) => {
  // 处理错误，例如：报告给一个服务
}

export function setupErrorHandler(app: App) {
  // Vue exception
  app.config.errorHandler = vueErrorHandler

  // script error
  window.onerror = scriptErrorHandler

  // promise exception
  registerPromiseErrorHandler()

  // static resource loading error
  registerResourceErrorHandler()
}
