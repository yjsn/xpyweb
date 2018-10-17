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
