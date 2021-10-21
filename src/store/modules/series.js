import { getSeries } from '@/api/series'
import { map, truncate } from 'lodash-es'

const state = {
  series: []
}
const getters = {
  getSeries: state => state.series,
  getSeriesMenuNav: state => [
    {
      name: '系列文章',
      children: map(state.series, val => {
        return {
          id: val.id,
          name: truncate(val.name, {
            length: 16
          })
        }
      })
    }
  ]
}
const mutations = {
  setSeries(state, result) {
    state.series = result
  }
}
const actions = {
  async setSeries({ commit }) {
    const { result } = await getSeries()
    commit('setSeries', result)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
