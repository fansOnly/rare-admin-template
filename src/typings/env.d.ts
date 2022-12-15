/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_USE_MOCK: boolean
  readonly VITE_USE_ENCRYPT: boolean
  readonly VITE_DROP_CONSOLE: boolean
  readonly VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
  readonly VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
  readonly VITE_USE_INSPECT: boolean
  readonly VITE_APP_TITLE: string
  readonly VITE_API_URL: string
  readonly VITE_API_CONTEXT: string
  readonly VITE_UPLOAD_URL: string
  readonly VITE_RESOURCE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
