import request from '@/utils/request'

export function login(accountNumber, accountPassword) {
  return request({
    url: '/api/merchant/login',
    method: 'post',
    data: {
      accountNumber,
      accountPassword
    }
  })
}

export function logout() {
  return request({
    url: '/api/merchant/loginOut',
    method: 'post'
  })
}

export function newRoutersOnline() {
  return request({
    url: 'api/merchant/permission',
    method: 'post'
  })
}

