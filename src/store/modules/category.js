import { getCategorie } from '@/api/categorie'

const state = {
  categorys: []
}
const getters = {
  getCategorys: state => {
    return state.categorys
  },
  getCategoryMenuNav: state => {
    return [
      {
        name: '分類',
        children: state.categorys
      }
    ]
  }
}
const mutations = {
  setCategorys(state, result) {
    state.categorys = result
  }
}
const actions = {
  async setCategorys({ commit }) {
    const { result } = await getCategorie()
    commit('setCategorys', result)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
