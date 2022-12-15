import type { ProxyOptions } from 'vite'

type ProxyItem = {
  [key: string]: string
}

type ProxyList = ProxyItem[]

type ProxyTargetList = Record<string, ProxyOptions>

export function createProxy(list: ProxyList) {
  let proxy: ProxyTargetList = {}

  for (const { prefix, target } of list) {
    proxy[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path: string) => path.replace(new RegExp(`^${prefix}`), '')
    }
  }

  return proxy
}
