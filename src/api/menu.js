import request from '@/utils/request'

export function getMenuList(params) {
  return request({
    url: '/api/menu/menuList',
    method: 'post',
    data: params
  })
}
export function addMenu(params) {
  return request({
    url: '/api/menu/add',
    method: 'post',
    data: params
  })
}
export function editMenu(params) {
  return request({
    url: '/api/menu/edit',
    method: 'post',
    data: params
  })
}
export function getParentList(params) {
  return request({
    url: '/api/menu/parentList',
    method: 'post',
    data: params
  })
}

export function disableMenu(params) {
  return request({
    url: '/api/menu/disableMenu',
    method: 'post',
    data: params
  })
}

export function ableMenu(params) {
  return request({
    url: '/api/menu/ableMenu',
    method: 'post',
    data: params
  })
}
