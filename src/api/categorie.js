import request from '@/utils/request'

export function getCategorie() {
  return request({
    url: '/categorie',
    method: 'get'
  })
}
