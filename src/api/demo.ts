import { httpPost } from '@/common/http'
import { BaseResult } from './model/base-model'
import {
  DemoListModel,
  DemoModel,
  IdQryParams,
  IdListParams,
  DemoListQryParams,
  DemoItemParams
} from './model/demo-model'

enum DemoApi {
  qryDemoList = '/demo/qryDemoList',
  qryDemo = '/demo/qryDemo',
  addDemo = '/demo/addDemo',
  updateDemo = '/demo/updateDemo',
  delDemo = '/demo/delDemo'
}

// 获取列表示例接口
export const qryDemoList = (params: DemoListQryParams) =>
  httpPost<DemoListModel>(DemoApi.qryDemoList, params)

// 获取详情示例接口
export const qryDemoDetail = (params: IdQryParams) => httpPost<DemoModel>(DemoApi.qryDemo, params)

// 新增详情示例接口
export const addDemo = (params: DemoItemParams) => httpPost<BaseResult>(DemoApi.addDemo, params)

// 修改详情示例接口
export const updateDemo = (params: DemoItemParams) =>
  httpPost<BaseResult>(DemoApi.updateDemo, params)

// 获取详情示例接口
export const deleteDemo = (params: IdListParams) => httpPost<BaseResult>(DemoApi.delDemo, params)
