import Vue from 'vue'
import axios from 'axios'
import {
  baseURL,
  contentType,
  debounce,
  invalidCode,
  noPermissionCode,
  unprocessableEntityCode,
  requestTimeout,
  successCode,
  loginInterception
} from '@/config'
import store from '@/store'
import qs from 'qs'
import router from '@/router'
import { isArray } from '@/utils/validate'

let loadingInstance

/**
 * @description 處理code異常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (status, data) => {
  switch (status) {
    case invalidCode:
      Vue.prototype.$baseMessage(data || `後端接口${status}異常`, 'error')
      // store.dispatch('user/resetAccessToken').catch(() => {})
      if (loginInterception) {
        location.reload()
      }
      break
    case noPermissionCode:
      router.push({ path: '/401' }).catch(() => {})
      break
    case unprocessableEntityCode:
      for (const [key, value] of Object.entries(data.errors)) {
        setTimeout(() => {
          Vue.prototype.$baseMessage(`${key}:${value[0]}`, 'error')
        }, 200)
      }
      break
    default:
      Vue.prototype.$baseMessage(data || `後端接口${status}異常`, 'error')
      break
  }
}

const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType
  }
})

instance.interceptors.request.use(
  (config) => {
    if (store.getters['user/accessToken']) {
      config.headers.Authorization = `Bearer ${store.getters['user/accessToken']}`
    }
    // 這裡會過濾所有為空、0、false的key，如果不需要請自行注釋
    if (config.data) {
      config.data = Vue.prototype.$baseLodash.pickBy(
        config.data,
        Vue.prototype.$baseLodash.identity
      )
    }
    if (
      config.data &&
      config.headers['Content-Type'] ===
        'application/x-www-form-urlencoded;charset=UTF-8'
    ) { config.data = qs.stringify(config.data) }
    if (debounce.some((item) => config.url.includes(item))) { loadingInstance = Vue.prototype.$baseLoading() }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    if (loadingInstance) loadingInstance.close()
    const { data, config, status } = response
    const { msg } = data
    // 操作正常Code數組
    const codeVerificationArray = isArray(successCode)
      ? [...successCode]
      : [...[successCode]]
    // 是否操作正常
    if (codeVerificationArray.includes(status)) {
      return data
    } else {
      handleCode(status, msg)
      return Promise.reject(
        'vue-admin-beautiful請求異常攔截:' +
          JSON.stringify({ url: config.url, status, msg }) || 'Error'
      )
    }
  },
  (error) => {
    if (loadingInstance) loadingInstance.close()
    const { response, message } = error
    if (error.response && error.response.data) {
      const { status, data } = response
      handleCode(status, data || message)
      return Promise.reject(error)
    } else {
      let { message } = error
      if (message === 'Network Error') {
        message = '後端接口連接異常'
      }
      if (message.includes('timeout')) {
        message = '後端接口請求超時'
      }
      if (message.includes('Request failed with status code')) {
        const code = message.substr(message.length - 3)
        message = '後端接口' + code + '異常'
      }
      Vue.prototype.$baseMessage(message || `後端接口未知異常`, 'error')
      return Promise.reject(error)
    }
  }
)

export default instance
