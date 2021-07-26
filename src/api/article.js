import request from '@/utils/request'

export function getArticle(params) {
  return request({
    url: '/article',
    method: 'get',
    params
  })
}
