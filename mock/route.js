import Mock from 'mockjs'

Mock.setup({
  timeout: '300-500'
})

const routeList = Mock.mock({
  "data": [
    {
      component: 'Layout',
      hidden: false,
      path: "/system",
      name: 'System',
      meta: { title: '系统管理', icon: 'system' },
      children: [
        {
          path: '/system/user',
          name: 'User',
          component: 'system/user/index',
          meta: { title: '用户管理', icon: 'every-user' },
        },
        {
          path: '/system/role',
          name: 'Role',
          component: 'system/role/index',
          meta: { title: '角色管理', icon: 'permissions' },
        },
        {
          path: '/system/menu',
          name: 'Menu',
          component: 'system/menu/index',
          meta: { title: '菜单管理', icon: 'tree-list' },
        },

      ]
    },
    {
      path: '/user',
      hidden: false,
      component: 'Layout',
      meta: { title: '个人中心', icon: 'people', breadcrumb: false },
      children: [
        {
          path: '/user/mycenter',
          component: 'system/user/my-center/index',
          name: 'MyCenter',
          meta: { title: '个人中心', icon: 'people', },
        }
      ]
    },
  ]
})
Mock.mock('/list', 'get', {
  code: 200,
  ...routeList,
})

export default routeList