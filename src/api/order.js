import request from '@/utils/request'

export function getOrderList(params) {
  return request({
    url: '/api/merits/list',
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
