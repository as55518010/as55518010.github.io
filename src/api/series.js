import request from '@/utils/request'

export function getSeries(params) {
  return request({
    url: '/serie',
    method: 'get',
    params
  })
}
export function getSeriesDetail(id, params) {
  return request({
    url: `/serie/${id}`,
    method: 'get',
    params
  })
}
