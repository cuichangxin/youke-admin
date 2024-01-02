import Mock from 'mockjs'

Mock.setup({
  timeout: '300-500'
})

const routeList = Mock.mock({
  "data": [
    {
      component: 'Layout',
      hidden: false,
      path: "/systems",
      name: 'Systems',
      meta: { title: '系统管理11' },
      children: [
        {
          path: '/user/indexs',
          component: 'system/user/indexs',
          hidden: false,
          meta: { title: '系统1', icon: 'aiming', noCache: false }
        }
      ]
    }
  ]
})
Mock.mock('/list', 'get', {
  code: 200,
  ...routeList,
})

export default routeList