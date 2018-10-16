import request from '@/utils/request'

export function getNewsList(params) {
  return request({
    url: '/api/indexManager/newsList',
    method: 'post',
    data: params
  })
}
