<template>
  <div v-if="!isEmpty(articleData)" id="article_body">
    <Title :article="articleData" />
    <PreLine :data="preLineCategoryMenuNav" />
    <ArticleDesc :article="articleData" class="article-body-item" />
    <PrePos :article="articleData" class="article-body-margin" target="category" :article-nearby="categoryArticleData.list" :upper-category="categorie" />
  </div>
</template>

<script>
import Title from '@/components/Article/Title'
import PreLine from '@/components/Article/PreLine'
import ArticleDesc from '@/components/Article/ArticleDesc'
import PrePos from '@/components/Article/PrePos'
import { showCategoryArticle, patchArticleDetail } from '@/api/article'
import { parseTime } from '@/utils/index'
import { isEmpty } from 'lodash-es'

import { reverse } from 'lodash-es'

export default {
  components: { PrePos, ArticleDesc, Title, PreLine },
  data: () => {
    return {
      articleData: {},
      categorie: {},
      categoryArticleData: {
        // 總文章數
        total: 0,
        // 文章列表
        list: [],
        // 分頁
        pagination: {
          // 每頁數量
          size: 5,
          // 頁數
          page: 1
        },
        // 篩選條件
        where: {}
      }
    }
  },
  computed: {
    categoryId() {
      return Number(this.$route.params.categoryId)
    },
    articleId() {
      return Number(this.$route.params.articleId)
    },
    params() {
      return {
        category: {
          pagination: this.categoryArticleData.pagination,
          where: this.categoryArticleData.where
        }
      }
    },
    preLineCategoryMenuNav() {
      return reverse(this.getAllParentArr(this.$store.getters['category/getCategoryMenuNav'], this.categoryId))
    }
  },
  watch: {
    $route: {
      handler: function() {
        this.articleInit()
        this.eventBus()
      },
      immediate: true
    }
  },
  beforeDestroy() {
    this.$baseEventBus.$emit('articleInitedClose')
  },
  methods: {
    eventBus() {
      this.$baseEventBus.$emit('onRouteActive', `/subject/category/${this.categoryId}`)
      this.$baseEventBus.$emit('upHotArticleList')
    },
    noticeUpdateEvent(commentId) {
      this.$refs.articleComment.setUpdateCommentId(commentId)
    },
    noticeReplayEvent(commentId, commenter) {
      this.$refs.articleComment.setReplayCommentId(commentId, commenter)
    },
    noticeQuoteEvent(commentId, commenter) {
      this.$refs.articleComment.setQuoteCommentId(commentId, commenter)
    },
    /* 獲取文章詳情 */
    async articleInit() {
      const { articleData, categoryArticleData, categorie } = await showCategoryArticle(this.articleId, this.categoryId, this.params)
      this.upView(articleData)
      this.articleData = articleData
      this.categorie = categorie
      this.categoryArticleDataRes(categoryArticleData)
    },
    categoryArticleDataRes(res) {
      this.categoryArticleData.list = res.list
      this.categoryArticleData.total = res.pagination.total
    },
    async upView(articleData) { // 更新觀看次數
      articleData.articleDetil.view += 1
      const from = { view: articleData.articleDetil.view }
      await patchArticleDetail(this.articleId, from)
      this.$baseEventBus.$emit('upHotArticleList')
    },
    parseTime(time, cFormat) {
      return parseTime(time, cFormat)
    },
    isEmpty(val) {
      return isEmpty(val)
    },
    getAllParentArr(list, id) {
      for (const i in list) {
        if (list[i].id === id) {
          // 查询到返回该数组对象
          return [list[i]]
        }
        if (list[i].children) {
          const node = this.getAllParentArr(list[i].children, id)
          if (node !== undefined) {
            // 查询到把父节点连起来
            return node.concat(list[i])
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
#article_body {
  border-right: 1px solid #dee5e7;
  box-sizing: border-box;
  background-color: #f6f8f9;
  .article-body-margin {
    margin: 10px 15px 10px 15px;
  }
  .article-body-item {
    background-color: white;
    margin: 10px 15px 10px 15px;
    box-sizing: border-box;
    box-shadow: 1px 1px 2px rgba(80, 80, 80, 0.2);
    border-radius: 5px;
    border: 1px solid hsla(0, 0%, 94.1%, 0.8);
    padding: 20px 30px 20px 30px;
  }
}
</style>
