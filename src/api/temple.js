import request from '@/utils/request'

export function getTempleList(params) {
  return request({
    url: '/api/temple/templePage',
    method: 'post',
    data: params
  })
}
export function queryTempleIntroduce(params) {
  return request({
    url: '/api/templeIntroduce/queryTempleIntroduce',
    method: 'post',
    data: params
  })
}
export function queryEditTempleIntroduce(params) {
  return request({
    url: '/api/templeIntroduce/edit',
    method: 'post',
    data: params
  })
}
export function templeMonkList(params) {
  return request({
    url: '/api/templeMonk/queryPage',
    method: 'post',
    data: params
  })
}
export function templeMonkEdit(params) {
  return request({
    url: '/api/templeMonk/edit',
    method: 'post',
    data: params
  })
}
export function templeMonkAdd(params) {
  return request({
    url: '/api/templeMonk/add',
    method: 'post',
    data: params
  })
}
export function templeNewsList(params) {
  return request({
    url: '/api/templeNews/newsList',
    method: 'post',
    data: params
  })
}
export function templeNewsInfoAdd(params) {
  return request({
    url: '/api/templeNews/addNewsInfo',
    method: 'post',
    data: params
  })
}
export function templeNewsInfoEdit(params) {
  return request({
    url: '/api/templeNews/editNewsInfo',
    method: 'post',
    data: params
  })
}
export function ableTemple(params) {
  return request({
    url: '/api/temple/ableTemple',
    method: 'post',
    data: params
  })
}
export function checkFailTemple(params) {
  return request({
    url: '/api/temple/checkFail',
    method: 'post',
    data: params
  })
}
export function disableTemple(params) {
  return request({
    url: '/api/temple/disableTemple',
    method: 'post',
    data: params
  })
}
