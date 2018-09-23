import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/api/role/roleList',
    method: 'post',
    data: params
  })
}
