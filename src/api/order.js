import request from '@/utils/request'

export function getOrderList(params) {
  return request({
    url: '/api/merits/list',
    method: 'post',
    data: params
  })
}

export function getTempleOrderList(params) {
  return request({
    url: '/api/merits/templeList',
    method: 'post',
    data: params
  })
}

export function orderCompletion(params) {
  return request({
    url: '/api/merits/completion',
    method: 'post',
    data: params
  })
}

export function orderDetail(params) {
  return request({
    url: '/api/merits/meritsDetail',
    method: 'post',
    data: params
  })
}
