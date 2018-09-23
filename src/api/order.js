import request from '@/utils/request'

export function getOrderList(params) {
  return request({
    url: '/api/merits/list',
    method: 'post',
    data: params
  })
}
