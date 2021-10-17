import request from '@/utils/request'

export function getNewsfeedApi(params = undefined) {
  return request({
    url: 'newsfeed',
    method: 'get',
    params
  })
}
