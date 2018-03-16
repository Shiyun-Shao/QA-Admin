import request from '@/utils/request'

export function login(username, password) {
  return request.post('/users/login', {
    username,
    password
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout.jhtml',
    method: 'get'
  })
}
