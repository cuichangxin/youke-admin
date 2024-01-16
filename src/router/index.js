import { createRouter, createWebHistory } from 'vue-router'
// import Cookies from 'js-cookie'

import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
  }
 */

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
    path: '/user',
    hidden: false,
    component: Layout,
    children: [
      {
        path: '/user/mycenter',
        component: () => import('@/page/person-center/index.vue'),
        name: 'MyCenter',
        meta: { title: '个人中心', icon: 'people', },
      }
    ]
  },
  {
    path:'/redirect',
    component:Layout,
    hidden: true,
    children:[
      {
        path:'/redirect/:path(.*)',
        component:() => import('@/page/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    hidden: true,
    component: () => import('@/page/login.vue'),
  },
  {
    path: '/401',
    hidden: true,
    component: () => import('@/page/401.vue'),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import('@/page/404.vue'),
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