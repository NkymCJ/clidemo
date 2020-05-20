import request from '@/utils/request'
console.log('request:', request)
export function login(data) {
  console.log('Request login data: ', data)
  // return request({
  //   url: '/login',
  //   method: 'post',
  //   data
  // })
}

export function getInfo(token) {
  console.log('Request getInfo token: ', token)
  // return request({
  //   url: '/info',
  //   method: 'get',
  //   params: { token }
  // })
}

export function logout() {
  console.log('Request logout')
  // return request({
  //   url: '/logout',
  //   method: 'post'
  // })
}
