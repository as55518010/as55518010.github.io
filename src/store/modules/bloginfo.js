import { articleCount } from '@/api/article.js'
import { getBlogInfoDetail } from '@/api/blogInfo.js'
import pngtree from '@/assets/images/pngtree.jpg'

const state = {
  blogInfoId: 1,
  blogArticleTotal: 0, // 目前總文章數
  blogCreateTime: new Date(), // 部落格創建日期
  blogBottomNarrate: '', // 下方資訊
  blogThemeStyle: '', // 主題樣式
  blogBigBackImg: '', // 底圖
  author: {
    blogNickname: '', // 版主暱稱
    blogAvatarImg: '', // 頭像
    blogAuthorIntroduction: '', // 作者自介
    blogAuthorGithub: '', // 作者github
    blogAuthorEmail: '', // 作者email
    blogAvatarSign: ' ↗↗點擊頭像關注我。', // 頭像標誌
    blogAuthorBackImg: pngtree // 作者自介底圖
  }
}
const getters = {
  operatingDays(state) {
    return parseInt(
      Math.abs(new Date() - state.blogCreateTime) / 1000 / 60 / 60 / 24
    )
  },
  blogHeadTitle(state) {
    return `${state.author.blogNickname}個人部落格`
  },
  blogCopyright(state) {
    return `Copyright © ${state.blogCreateTime.getFullYear()} ${
      state.author.blogNickname
    }`
  },
  blogbgImg(state) {
    return {
      background: `url(${state.blogBigBackImg}) 0% 0% / 100% 100% rgb(248, 248, 255)`
    }
  },
  blogGithubUrl(state) {
    return `https://github.com/${state.author.blogAuthorGithub}`
  }
}
const mutations = {
  setBlogArticleTotal(state, result) {
    state.blogArticleTotal = result
  },
  setBlogCreateTime(state, result) {
    state.blogCreateTime = new Date(result)
  },
  setBlogBottomNarrate(state, result) {
    state.blogBottomNarrate = result
  },
  setBlogThemeStyle(state, result) {
    state.blogThemeStyle = result
  },
  setBlogBigBackImg(state, result) {
    state.blogBigBackImg = result
  },
  setBlogAuthor(state, result) {
    state.author.blogNickname = result.name
    state.author.blogAvatarImg = result.detail.avatarPath
    state.author.blogAuthorIntroduction = result.detail.introduction
    state.author.blogAuthorGithub = result.detail.contactGithub
    state.author.blogAuthorEmail = result.detail.contactEmail
  }
}
const actions = {
  async setBlogArticleTotal({ commit }) {
    const { result } = await articleCount()
    commit('setBlogArticleTotal', result)
  },
  async setBlogInfo({ commit, state }) {
    const { result } = await getBlogInfoDetail(state.blogInfoId)
    commit('setBlogCreateTime', result.blogCreateTime)
    commit('setBlogBottomNarrate', result.blogBottomNarrate)
    commit('setBlogThemeStyle', result.blogThemeStyle)
    commit('setBlogBigBackImg', result.blogBigBackImg)
    commit('setBlogAuthor', result.user)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
