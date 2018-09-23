import request from '@/utils/request'

export function getOrderList(params) {
  return request({
    url: '/user/findUserList',
    method: 'post',
    data: params
  })
}
