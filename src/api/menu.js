import request from '@/utils/request'

// 获取路由信息
export function getRouters(){
  return request({
    url:'/getRouters',
    method:'get',
  })
}
