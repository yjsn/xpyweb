import request from '@/utils/request'

export function indexBannerList(params) {
  return request({
    url: '/api/indexManager/indexBannerList',
    method: 'post',
    data: params
  })
}
export function indexNewsList(params) {
  return request({
    url: '/api/indexManager/indexNewsList',
    method: 'post',
    data: params
  })
}
export function religiousCeremonies(params) {
  return request({
    url: '/api/indexManager/religiousCeremonies',
    method: 'post',
    data: params
  })
}
