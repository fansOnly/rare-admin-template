const zIndex = ref(0)

export const useZIndex = () => {
  const initialZIndex = 2000
  const currentZIndex = computed(() => zIndex.value + initialZIndex)

  const nextZIndex = () => {
    zIndex.value++
    return currentZIndex.value
  }

  return {
    initialZIndex,
    currentZIndex,
    nextZIndex
  }
}
