import request from '@/utils/request'

export function getNewsList(params) {
  return request({
    url: '/api/indexManager/newsList',
    method: 'post',
    data: params
  })
}
export function addNewsInfo(params) {
  return request({
    url: '/api/indexManager/addNewsInfo',
    method: 'post',
    data: params
  })
}
export function editNewsInfo(params) {
  return request({
    url: '/api/indexManager/editNewsInfo',
    method: 'post',
    data: params
  })
}
export function deleteNewsInfo(params) {
  return request({
    url: '/api/indexManager/deleteNewsInfo',
    method: 'post',
    data: params
  })
}
export function disableNewsInfo(params) {
  return request({
    url: '/api/indexManager/disableNewsInfo',
    method: 'post',
    data: params
  })
}
export function ableNewsInfo(params) {
  return request({
    url: '/api/indexManager/ableNewsInfo',
    method: 'post',
    data: params
  })
}
