import { httpPost } from '@/common/http'

enum DemoApi {
  qryDemoList = '/demo/qryDemoList',
  qryDemo = '/demo/qryDemo',
  addDemo = '/demo/addDemo',
  updateDemo = '/demo/updateDemo',
  delDemo = '/demo/delDemo'
}

// 获取列表示例接口
export const qryDemoList = <T>(params: object) => httpPost<T>(DemoApi.qryDemoList, params)

// 获取详情示例接口
export const qryDemoDetail = <T>(params: object) => httpPost<T>(DemoApi.qryDemo, params)

// 新增详情示例接口
export const addDemo = <T>(params: object) => httpPost<T>(DemoApi.addDemo, params)

// 修改详情示例接口
export const updateDemo = <T>(params: object) => httpPost<T>(DemoApi.updateDemo, params)

// 获取详情示例接口
export const deleteDemo = <T>(params: object) => httpPost<T>(DemoApi.delDemo, params)
