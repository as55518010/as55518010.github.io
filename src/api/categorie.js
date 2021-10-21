import request from '@/utils/request'

export function getCategorie() {
  return request({
    url: '/categorie',
    method: 'get'
  })
}
export function getCategorieDetail(id, params) {
  return request({
    url: `/categorie/${id}`,
    method: 'get',
    params
  })
}
