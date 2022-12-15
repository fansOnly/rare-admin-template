import type { FormItemProps } from 'element-plus'
type useTableApi = <T>(params: T) => Promise<any>

export const useTablePage = (formItems: FormItemProps[], api: useTableApi) => {
  const model: Recordable = reactive({})
  formItems.map((item: Recordable) => {
    model[item.prop] = item.value
  })

  const list = ref<any>([])
  const pageStep = ref(10)
  const pagination = reactive({
    loading: false,
    total: 0,
    page: 1,
    pageSize: 10,
    pageSizes: Array.from({ length: 5 }).map((_, i) => (i + 1) * pageStep.value)
  })

  const loadData = async (reload = false) => {
    if (reload && pagination.page !== 1) {
      return (pagination.page = 1)
    }
    const params = {
      ...toRaw(model),
      page: pagination.page,
      pageSize: pagination.pageSize
    }
    pagination.loading = true
    const data = await api(params)
    list.value = data.LIST
    pagination.total = data.TOTAL
    pagination.loading = false
  }

  // onMounted(() => watchEffect(loadData))

  onMounted(() => {
    watchEffect(() => {
      loadData()
    })
  })

  return {
    loadData,
    list,
    pagination,
    model
  }
}
