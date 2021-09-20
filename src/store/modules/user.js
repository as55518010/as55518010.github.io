/**
 * @description 登錄、獲取用戶信息、退出登錄、清除accessToken邏輯，不建議修改
 */

import Vue from 'vue'
import { getInfo, login, logout } from '@/api/user'
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
  getUserInfo, setUserInfo, removeUserInfo
} from '@/utils/user'
import { resetRouter } from '@/router'
import { title } from '@/config'

const state = () => ({
  accessToken: getAccessToken(),
  userInfo: getUserInfo(),
  permissions: []
})
const getters = {
  accessToken: state => {
    return state.accessToken || getAccessToken()
  },
  userInfo: state => state.userInfo || getUserInfo(),
  permissions: state => state.permissions
}
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    setAccessToken(accessToken)
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
    setUserInfo(userInfo)
  },
  setPermissions(state, permissions) {
    state.permissions = permissions
  }
}
const actions = {
  setPermissions({ commit }, permissions) {
    commit('setPermissions', permissions)
  },
  async getAccessToken({ commit }, form) {
    const { result } = await login(form)
    const accessToken = result.token
    if (accessToken) {
      commit('setAccessToken', accessToken)
    } else {
      Vue.prototype.$baseMessage(`登錄接口異常，未正確返回token...`, 'error')
    }
  },
  async getUserInfo({ commit, state }) {
    console.log('good')
    const { result } = await getInfo()
    if (!result) {
      Vue.prototype.$baseMessage('驗證失敗，請重新登錄...', 'error')
      return false
    }
    if (result) {
      // commit('setPermissions', permissions)
      commit('setUserInfo', result)
      // return permissions
    } else {
      Vue.prototype.$baseMessage('用戶信息接口異常', 'error')
      return false
    }
  },
  async logout({ dispatch }) {
    await logout(state.accessToken)
    await dispatch('resetAccessToken')
    await resetRouter()
    Vue.prototype.$baseNotify(
      `退出登錄成功`,
      `歡迎下次光臨(●ˇ∀ˇ●)`
    )
  },
  resetAccessToken({ commit }) {
    // commit('setPermissions', [])
    commit('setAccessToken', '')
    commit('setUserInfo', '')
    removeAccessToken()
    removeUserInfo()
  },
  async login({ dispatch, state }, form) {
    await dispatch('getAccessToken', form)
    if (state.accessToken) {
      await dispatch('getUserInfo')
      const hour = new Date().getHours()
      const thisTime =
        hour < 8
          ? '早上好'
          : hour <= 11
            ? '上午好'
            : hour <= 13
              ? '中午好'
              : hour < 18
                ? '下午好'
                : '晚上好'
      Vue.prototype.$baseNotify(
        `${thisTime}，馬上帶您去瀏覽我的小站！`,
        `歡迎登錄${title}`
      )
    }
  }
}
export default { state, getters, mutations, actions }
