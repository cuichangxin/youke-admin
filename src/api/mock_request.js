/** 配合mock使用 */
import axios from 'axios'
import { Message, Modal } from '@arco-design/web-vue'
import { getToken, clearToken } from '@/utils/auth'
import errorCode from '@/utils/errCode'
import router from '../router/index'
import qs from 'qs'

const http = axios.create({
  request: import.meta.env.VITE_APP_BASE_API,
  timeout: 3000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
})

// 通用请求拦截器
http.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers.Authorization = getToken()
    }
    return config
  },
  err => {
    return Promise.reject(err)
  },
)
// 通用响应拦截器
http.interceptors.response.use(
  response => {
    // 未设置状态码则默认成功状态
    const code = response.data.code || 200
    // 获取错误信息
    const msg = errorCode[code] || response.data.msg || errorCode.default
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
      return Promise.reject(msg)
    } else {
      return Promise.resolve(response.data)
    }
  },
  error => {
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

export const postRequest = (url, data, params, type = 'json') => {
  if (type === 'json') {
    return http({
      url,
      method: 'POST',
      data: JSON.stringify(data),
      params,
    })
  } else {
    return http({
      url,
      data: qs.stringify(data),
      params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  }
}

export const getRequest = (url, params) => {
  return http({
    method: 'get',
    url,
    params,
  })
}

export const putRequest = (url, data, params) => {
  return http({
    method: 'put',
    url,
    data,
    params,
  })
}

export const deleteRequest = (url, params, data) => {
  return http({
    method: 'delete',
    url,
    params,
    data,
  })
}
