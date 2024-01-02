import { createRouter, createWebHistory } from 'vue-router'
// import Cookies from 'js-cookie'

import Layout from '@/layout'


// 公共路由
export const constantRoutes = [
  {
    path: '/',
    redirect: '/index',
    component: Layout,
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/page/index.vue'),
        meta: { title: '工作台', icon: 'workbench' },
      },
    ]
  },
  {
    path: '/system',
    name: 'System',
    component: Layout,
    alwaysShow: true,
    meta: { title: '系统管理', icon: 'system' },
    children: [
      {
        path: '/system/user',
        name: 'User',
        component: () => import('@/page/system/user/index.vue'),
        meta: { title: '用户管理', icon: '' },
      },
      {
        path: '/system/role',
        name: 'Role',
        component: () => import('@/page/system/role/index.vue'),
        meta: { title: '角色管理', icon: '' },
      },
      {
        path: '/system/menu',
        name: 'Menu',
        component: () => import('@/page/system/menu/index.vue'),
        meta: { title: '菜单管理', icon: '' },
      },

    ]

  },
  {
    path: '/user',
    hidden: false,
    component: Layout,
    meta: { title: '个人中心', icon: 'people', },
    children: [
      {
        path: '/user/mycenter',
        component: () => import('@/page/system/user/my-center/index.vue'),
        name: 'MyCenter',
        meta: { title: '个人中心', icon: 'people', },
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/page/login.vue'),
  },
  {
    path: '/404',
    name: '404',
    hidden: true,
    component: () => import('@/page/404.vue'),

  },
  {
    path: '/401',
    name: '401',
    hidden: true,
    component: () => import('@/page/401.vue'),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: '/404',
    hidden: true
  }
]

// 权限路由
export const dynamicRoutes = [
  {
    path: '/system/user-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:user:edit'],
    children: [
      {
        path: 'role/:userId(\\d+)',
        component: () => import('@/page/system/user/authRole'),
        name: 'AuthRole',
        meta: { title: '分配角色' }
      }
    ]
  },
  {
    path: '/system/role-auth',
    component: Layout,
    hidden: true,
    permissions: ['system:role:edit'],
    children: [
      {
        path: 'user/:roleId(\\d+)',
        component: () => import('@/page/system/role/authUser'),
        name: 'AuthUser',
        meta: { title: '分配用户' }
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})


export default router