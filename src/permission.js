import Cookies from 'js-cookie'
import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from './utils/auth';
import { isHttp } from '@/utils/utils'
import { Message } from '@arco-design/web-vue';
import { useKeepAlive, useUserStore, usePermissionStore } from '@/store';
import { setRouteEmitter } from '@/utils/route-listener'

NProgress.configure({ showSpinner: false });
const whiteList = ['/login', '/404', '/401'];


router.beforeEach((to, from, next) => {
  NProgress.start()
  setRouteEmitter(to)
  const userStore = useUserStore()
  const usePermission = usePermissionStore()
  // 动态添加keepalive缓存
  if (!to.meta.noCache) {
    const { addKeepAlive } = useKeepAlive()
    addKeepAlive(to.name)
  }
  // 有token
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if (userStore.role.length === 0) {
        userStore.info().then(() => {
          usePermission.generateRoutes().then((accessRoutes) => {
            accessRoutes.forEach(route => {
              if (!isHttp(route.path)) {
                router.addRoute(route) // 动态添加可访问路由表
              }
            })
            userStore.role = ['common']
            next({ ...to, replace: true }) 
          })
        }).catch(err => {
          // userStore.logout().then(() => {
          //   Message.error(err)
          //   next({ path: '/' })
          // })
        })
      }else {
        next()
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})