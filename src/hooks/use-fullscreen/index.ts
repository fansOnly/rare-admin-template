import { useFullscreen as ufs } from '@vueuse/core'

export function useFullscreen(context: HTMLElement | null) {
  const { isFullscreen, toggle } = ufs(context)

  return { isFullscreen, toggle }
}
