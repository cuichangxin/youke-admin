import axios from 'axios'
import { Modal, Message } from '@arco-design/web-vue'
import { getToken, clearToken } from '@/utils/auth'
import errorCode from '@/utils/errCode'
import router from '../router/index'

// 请求记录栈
// const requestStack = []
// let cid = 0
// function showLoading() {
//   document.getElementById('el-loading-spin').style.display = 'block'
// }
// function hideLoading() {
//   document.getElementById('el-loading-spin').style.display = 'none'
// }

/**
 * 请求记录入栈
 */
// function pushTarget() {
//   if (!requestStack.length) {
//     showLoading()
//   }
//   requestStack.push(cid++)
// }
/**
 * 请求记录出栈
 */
// function popTarget() {
//   if (requestStack.length) {
//     requestStack.pop()
//   }
//   // 所有请求处理完毕清空
//   if (!requestStack.length) {
//     hideLoading()
//   }
// }

const Axios = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeoutL: 100000,
  headers: { 'Content-Type': 'application/json;' },
})
// 通用请求拦截器
Axios.interceptors.request.use(
  config => {
    // pushTarget()
    if (getToken()) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  err => {
    return Promise.reject(err)
  },
)
// 通用响应拦截器
Axios.interceptors.response.use(
  response => {
    // popTarget()
    // 未设置状态码则默认成功状态
    const code = response.data.code || 200
    // 获取错误信息
    const msg = errorCode[code] || response.data.msg || errorCode['default']
    if (code === 401) {
      Modal.confirm({
        title: '系统提示',
        content: '登录状态已过期，您可以继续留在该页面，或者重新登录',
        onOk: () => {
          clearToken()
          router.replace({ path: '/login' })
        },
      })
    } else if (code === 500) {
      Message.error(msg)
      return Promise.reject(new Error(msg))
    } else if (code === 601) {
      Message.warning(msg)
      return Promise.reject(new Error(msg))
    } else if (code !== 200) {
      Message.error(msg)
      return Promise.reject('error')
    } else {
      return Promise.resolve(response.data)
    }
  },
  error => {
    // popTarget()
    console.log('err' + error)
    let { message } = error
    if (message == 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    Message.error(message)
    return Promise.reject(error)
  },
)

export default Axios
