import { articleCount } from '@/api/article.js'

const state = {
  blogNickname: 'Derrick', // 版主暱稱
  blogCreateTime: new Date('2021-06-30'), // 部落格創建日期
  blogArticleTotal: 0, // 目前總文章數
  blogBottomNarrate: 'Vue2 構建', // 下方資訊
  blogThemeStyle: 'style0', // 主題樣式
  blogBigBackImg: 'https://cjunn.gitee.io/blog_theme_atum/img/body/background.jpg', // 底圖
  blogAvatarSign: ' ↗↗點擊頭像關注我。', // 頭像標誌
  blogAvatarImg: ' https://www.lingmx.com/image/avatar.jpg' // 頭像
}
const getters = {
  operatingDays(state) {
    return parseInt(
      Math.abs(new Date() - state.blogCreateTime) / 1000 / 60 / 60 / 24
    )
  },
  blogHeadTitle(state) {
    return `${state.blogNickname}個人部落格`
  },
  blogCopyright(state) {
    return `Copyright © ${state.blogCreateTime.getFullYear()} ${
      state.blogNickname
    }`
  },
  blogbgImg(state) {
    return {
      background: `url(${state.blogBigBackImg}) 0% 0% / 100% 100% rgb(248, 248, 255)`
    }
  }
}
const mutations = {
  setBlogArticleTotal(state, result) {
    state.blogArticleTotal = result
  }
}
const actions = {
  async setBlogArticleTotal({ commit }) {
    const { result } = await articleCount()
    commit('setBlogArticleTotal', result)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
