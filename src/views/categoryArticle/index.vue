<template>
  <div v-if="!isEmpty(articleData)" id="article_body">
    <Title :article="articleData" @openFullScreenEven="openFullScreenEven" />
    <PreLine :data="preLineCategoryMenuNav" />
    <ArticleDesc :article="articleData" class="article-body-item" />
    <PrePos :article="articleData" class="article-body-margin" target="category" />
    <!-- <Comment ref="articleComment" class="article-body-item" :article-id="articleId" /> -->
    <!-- <Message class="article-body-item" :article-id="articleId" @noticeReplayEvent="noticeReplayEvent" @noticeQuoteEvent="noticeQuoteEvent" @noticeUpdateEvent="noticeUpdateEvent" /> -->
  </div>
</template>

<script>
import Title from './components/Title'
import PreLine from './components/PreLine'
import ArticleDesc from './components/ArticleDesc'
import Comment from './components/Comment'
import Message from './components/Message'
import PrePos from './components/PrePos'
import { getArticleDetail } from '@/api/article'
import { parseTime } from '@/utils/index'
import { isEmpty } from 'lodash-es'

import { reverse } from 'lodash-es'

export default {
  name: 'Article',
  components: { PrePos, Message, Comment, ArticleDesc, Title, PreLine },
  data: () => {
    return {
      articleData: {},
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
          id: this.categoryId,
          pagination: this.categoryArticleData.pagination,
          where: this.categoryArticleData.where
        }
      }
    },
    categoryMenuNav() {
      return this.$store.getters['category/getCategoryMenuNav']
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
    },
    openFullScreenEven() {
      this.$baseEventBus.$emit('openFullScreenEven', {
        title: this.articleInfo.title,
        body: this.article.body
      })
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
      const { articleData, categoryArticleData } = await getArticleDetail(this.articleId, this.params)
      this.articleData = articleData
      this.articleData = articleData
      this.categoryArticleDataRes(categoryArticleData)
    },
    categoryArticleDataRes(res) {
      this.categoryArticleData.list = res.list
      this.categoryArticleData.total = res.pagination.total
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
