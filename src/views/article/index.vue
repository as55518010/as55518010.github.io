<template>
  <div id="article_body">
    <Title :article="article" @openFullScreenEven="openFullScreenEven" />
    <PreLine />
    <ArticleDesc :article="article" class="article-body-item" />
    <PrePos :article="article" class="article-body-margin" />
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

export default {
  name: 'Article',
  components: { PrePos, Message, Comment, ArticleDesc, Title, PreLine },
  data: () => {
    return {
      articleId: '',
      article: {}
    }
  },
  watch: {
    $route() {
      this.getArticle()
    }
  },
  created() {
    this.getArticle()
  },
  beforeDestroy() {
    this.$baseEventBus.$emit('articleInitedClose')
  },
  methods: {
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
    initArticle() {
      // Promise.all([
      //   blogApi.loadArticle(this.articleId).then((data) => {
      //     this.article = data
      //     this.articleInfo.fontNum = data.fontNum
      //     this.articleInfo.title = data.title
      //     this.articleInfo.time = data.time
      //     this.articleInfo.viewCount = data.readNum
      //   }),
      //   blogApi.loadCommentCount(this.articleId).then((data) => {
      //     this.articleInfo.commentCount = data
      //   }),
      //   blogApi.loadCategoriesTags(this.articleId).then((data) => {
      //     this.articleInfo.articleLabels = data.tags
      //   })
      // ]).then(() => {
      //   this.$nextTick(() => {
      //     this.BlogHeadBar.emit('fullLoadingClose')
      //   })
      // })
    },
    /* 獲取文章詳情 */
    async getArticle() {
      this.articleId = this.$route.params.articleId
      const { data } = await getArticleDetail(this.articleId)
      this.article = data
    },
    parseTime(time, cFormat) {
      return parseTime(time, cFormat)
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
