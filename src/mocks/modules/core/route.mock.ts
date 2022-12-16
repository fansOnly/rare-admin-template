import { MockMethod } from 'vite-plugin-mock'

export default [
  {
    url: '/api-proxy/core/qryUserRoutes',
    method: 'post',
    response: {
      STATUS: '1',
      MSG: 'success',
      LIST: [
        // ----- 首页
        {
          path: '/index',
          name: 'Index',
          component: 'index',
          sortNum: 10,
          parentId: '',
          menuId: 'M20210923173316046410000000005',
          menuType: 'default',
          menuIcon: 'house',
          menuTitle: '首页',
          menuAffix: '1',
          visible: '1',
          cache: '1'
        },
        // ----- 演示示例
        {
          path: '/demo',
          name: 'Demo',
          component: '',
          sortNum: 20,
          parentId: '',
          menuId: 'M2021092317331604641000000018',
          menuType: 'default',
          menuIcon: 'reading',
          menuTitle: '演示示例',
          menuAffix: '0',
          visible: '1',
          cache: '1'
        },
        {
          path: '/demo/icon',
          name: 'DemoIcon',
          component: 'demo/icons',
          sortNum: 10,
          parentId: 'M2021092317331604641000000018',
          menuId: 'M2021092317331604641000000018001',
          menuType: 'default',
          menuIcon: 'element-plus',
          menuTitle: '图标示例',
          menuAffix: '0',
          visible: '1',
          cache: '0'
        },
        {
          path: '/demo/table',
          name: 'DemoTable',
          component: 'demo/table',
          sortNum: 20,
          parentId: 'M2021092317331604641000000018',
          menuId: 'M2021092317331604641000000018002',
          menuType: 'default',
          menuIcon: 'tickets',
          menuTitle: '表格示例',
          menuAffix: '0',
          visible: '1',
          cache: '0'
        },
        {
          path: '/demo/echarts',
          name: 'DemoEcharts',
          component: 'demo/echarts',
          sortNum: 30,
          parentId: 'M2021092317331604641000000018',
          menuId: 'M2021092317331604641000000018003',
          menuType: 'default',
          menuIcon: 'pie-chart',
          menuTitle: '图表示例',
          menuAffix: '0',
          visible: '1',
          cache: '0'
        },
        {
          path: '/demo/link',
          name: 'DemoLink',
          component: '',
          sortNum: 40,
          parentId: 'M2021092317331604641000000018',
          menuId: 'M2021092317331604641000000018004',
          menuType: 'default',
          menuIcon: 'link',
          menuTitle: '链接示例',
          menuAffix: '0',
          visible: '1',
          cache: '0'
        },
        {
          path: '/demo/link/external',
          name: 'DemoLinkExternal',
          component: '',
          sortNum: 10,
          parentId: 'M2021092317331604641000000018004',
          menuId: 'M202109231733160464100000001800401',
          menuType: 'external-link',
          menuLink: 'https://www.baidu.com',
          menuIcon: '',
          menuTitle: '外链示例',
          menuAffix: '0',
          visible: '1',
          cache: '1'
        },
        {
          path: '/demo/link/iframe',
          name: 'DemoLinkIframe',
          component: '',
          sortNum: 20,
          parentId: 'M2021092317331604641000000018004',
          menuId: 'M202109231733160464100000001800402',
          menuType: 'iframe',
          menuLink: 'https://www.baidu.com',
          menuIcon: '',
          menuTitle: 'iframe示例',
          menuAffix: '0',
          visible: '1',
          cache: '1'
        },
        // ----- 活动模版
        {
          path: '/tpl',
          name: 'Tpl',
          component: 'tpl',
          sortNum: 30,
          parentId: '',
          menuId: 'M20210924141757209200000000052',
          menuType: 'default',
          menuIcon: 'star',
          menuTitle: '活动模版',
          menuAffix: '0',
          visible: '1',
          cache: '1'
        },
        // ----- 系统管理
        {
          path: '/system',
          name: 'System',
          component: '',
          sortNum: 10000,
          parentId: '',
          menuId: 'M20210924141757209200000000051',
          menuType: 'default',
          menuIcon: 'setting',
          menuTitle: '系统管理',
          menuAffix: '0',
          visible: '1',
          cache: '1'
        },
        {
          path: '/system/user',
          name: 'SystemUser',
          sortNum: 10,
          parentId: 'M20210924141757209200000000051',
          menuId: 'M2021092414175720920000000005100001',
          menuType: 'default',
          component: 'system/user',
          menuIcon: '',
          menuTitle: '用户管理',
          menuAffix: '0',
          visible: '1',
          cache: '1'
        },
        {
          path: '/system/role',
          name: 'SystemRole',
          component: 'system/user',
          sortNum: 20,
          parentId: 'M20210924141757209200000000051',
          menuId: 'M2021092414175720920000000005100002',
          menuType: 'default',
          menuIcon: '',
          menuTitle: '角色管理',
          menuAffix: '0',
          visible: '1',
          cache: '1'
        },
        {
          path: '/system/menu',
          name: 'SystemMenu',
          component: 'system/menu',
          sortNum: 30,
          parentId: 'M20210924141757209200000000051',
          menuId: 'M2021092414175720920000000005100003',
          menuType: 'default',
          menuIcon: '',
          menuTitle: '菜单管理',
          menuAffix: '0',
          visible: '1',
          cache: '1'
        },
        {
          path: '/system/parameter',
          name: 'SystemParameter',
          component: 'system/parameter',
          sortNum: 30,
          parentId: 'M20210924141757209200000000051',
          menuId: 'M2021092414175720920000000005100004',
          menuType: 'default',
          menuIcon: '',
          menuTitle: '参数管理',
          menuAffix: '0',
          visible: '1',
          cache: '1'
        }
      ]
    }
  }
] as MockMethod[]
