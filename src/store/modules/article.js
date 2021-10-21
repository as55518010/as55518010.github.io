import { getArticle } from '@/api/article'

const state = {
  hotArticleList: []
}
const getters = {
}
const mutations = {
  setHotArticleList(state, result) {
    state.hotArticleList = result
  }
}
const actions = {
  async setHotArticleList({ commit }, query) {
    const { list } = await getArticle(query)
    commit('setHotArticleList', list)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
