export const admin_data = [
  {
    name: 'System',
    path: '/system',
    hidden: false,
    redirect: 'noRedirect',
    component: 'Layout',
    alwaysShow: true,
    meta: {
      title: '系统管理',
      icon: 'system',
      noCache: false,
      link: null,
    },
    children: [
      {
        name: 'User',
        path: 'user',
        hidden: false,
        component: 'system/user/index',
        meta: {
          title: '用户管理',
          icon: 'peoples',
          noCache: false,
          link: null,
        },
      },
      {
        name: 'Role',
        path: 'role',
        hidden: false,
        component: 'system/role/index',
        meta: {
          title: '角色管理',
          icon: 'permissions',
          noCache: false,
          link: null,
        },
      },
      {
        name: 'Menu',
        path: 'menu',
        hidden: false,
        component: 'system/menu/index',
        meta: {
          title: '菜单管理',
          icon: 'application-menu',
          noCache: false,
          link: null,
        },
      },
    ],
  },
  {
    name: 'Tool',
    path: '/tool',
    hidden: false,
    redirect: 'noRedirect',
    component: 'Layout',
    alwaysShow: true,
    meta: {
      title: '系统工具',
      icon: 'tool',
      noCache: false,
      link: null,
    },
    children: [
      {
        name: 'Build',
        path: 'build',
        hidden: false,
        component: 'tool/build/index',
        meta: {
          title: '表单构建',
          icon: 'form-one',
          noCache: false,
          link: null,
        },
      },
    ],
  },
  {
    name: 'Http://ruoyi.vip',
    path: 'http://ruoyi.vip',
    hidden: false,
    component: 'Layout',
    meta: {
      title: '若依官网',
      icon: 'lark',
      noCache: false,
      link: 'http://ruoyi.vip',
    },
  },
]
export const test_data = [
  {
    name: 'Tool',
    path: '/tool',
    hidden: false,
    redirect: 'noRedirect',
    component: 'Layout',
    alwaysShow: true,
    meta: {
      title: '系统工具',
      icon: 'tool',
      noCache: false,
      link: null,
    },
    children: [
      {
        name: 'Build',
        path: 'build',
        hidden: false,
        component: 'tool/build/index',
        meta: {
          title: '表单构建',
          icon: 'form-one',
          noCache: false,
          link: null,
        },
      },
    ],
  },
  {
    name: 'Http://ruoyi.vip',
    path: 'http://ruoyi.vip',
    hidden: false,
    component: 'Layout',
    meta: {
      title: '若依官网',
      icon: 'lark',
      noCache: false,
      link: 'http://ruoyi.vip',
    },
  },
]
