import request from '@/utils/request'

export function getArticle(params = undefined) {
  return request({
    url: '/article',
    method: 'get',
    params
  })
}
export function getArticleDetail(id, params) {
  return request({
    url: `/article/${id}`,
    method: 'get',
    params
  })
}
export function showSeriesArticle(id, serieId, params) {
  return request({
    url: `/article/${id}/serie/${serieId}`,
    method: 'get',
    params
  })
}
export function showCategoryArticle(id, categorieId, params) {
  return request({
    url: `/article/${id}/categorie/${categorieId}`,
    method: 'get',
    params
  })
}
