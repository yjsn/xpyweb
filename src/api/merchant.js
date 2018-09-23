import request from '@/utils/request'

export function getMerchantList(params) {
  return request({
    url: '/api/merchant/query',
    method: 'post',
    data: params
  })
}
