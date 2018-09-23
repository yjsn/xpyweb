import request from '@/utils/request'

export function getUserList(params) {
  return request({
    url: '/user/findUserList',
    method: 'post',
    data: params
  })
}
