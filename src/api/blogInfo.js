import request from '@/utils/request'

export function getBlogInfoDetail(id) {
  return request({
    url: `/info/${id}`,
    method: 'get'
  })
}
