import { useRouter } from 'vue-router'
import { useTitle as usePageTitle } from '@vueuse/core'

export function useTitle() {
  const title = usePageTitle()

  const { currentRoute } = useRouter()

  watch(
    () => currentRoute.value.path,
    () => {
      const route = unref(currentRoute)
      const routeTitle = route?.meta?.title
      title.value = `${routeTitle} - ${import.meta.env.VITE_APP_TITLE}`
    },
    {
      immediate: true
    }
  )
}
