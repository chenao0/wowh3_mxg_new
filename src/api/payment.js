import request from './request'

export function getCheckout(uuid) {
  return request({
    url: '/rest/cash-in/checkout/' + uuid,
    method: 'get'
  })
}

export function selectMethod(data) {
  return request({
    url: '/rest/cash-in/checkout/' + data.uuid  +'/selectMethod',
    method: 'post',
    data
  })
}

export function unSelectMethod(uuid) {
  return request({
    url: '/rest/cash-in/checkout/' + uuid  +'/unSelectMethod',
    method: 'post'
  })
}