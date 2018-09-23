import request from '@/utils/request'

export function getBannerList(params) {
  return request({
    url: '/api/indexManager/bannerList',
    method: 'post',
    data: params
  })
}
export function addBannerInfo(params) {
  return request({
    url: '/api/indexManager/addBannerInfo',
    method: 'post',
    data: params
  })
}
export function editBannerInfo(params) {
  return request({
    url: '/api/indexManager/editBannerInfo',
    method: 'post',
    data: params
  })
}
export function deleteBannerInfo(params) {
  return request({
    url: '/api/indexManager/deleteBannerInfo',
    method: 'post',
    data: params
  })
}
