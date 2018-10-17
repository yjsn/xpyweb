import request from '@/utils/request'

export function getMeritsList(params) {
  return request({
    url: '/api/meritsProduct/page',
    method: 'post',
    data: params
  })
}

export function addMeritsProduct(params) {
  return request({
    url: '/api/meritsProduct/add',
    method: 'post',
    data: params
  })
}

export function editMeritsProduct(params) {
  return request({
    url: '/api/meritsProduct/edit',
    method: 'post',
    data: params
  })
}

export function getTempleList(params) {
  return request({
    url: '/api/temple/templeList',
    method: 'post',
    data: params
  })
}

export function disable(params) {
  return request({
    url: '/api/meritsProduct/disable',
    method: 'post',
    data: params
  })
}

export function able(params) {
  return request({
    url: '/api/meritsProduct/able',
    method: 'post',
    data: params
  })
}
