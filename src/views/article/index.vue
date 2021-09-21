<template>
  <div v-if="!isEmpty(articleData)" id="article_body">
    <Title v-if="!isEmpty(articleData)" :article="articleData" @openFullScreenEven="openFullScreenEven" />
    <PreLine :data="preLineCategoryMenuNav" />
    <ArticleDesc :article="articleData" class="article-body-item" />
    <PrePos :article="articleData" class="article-body-margin" target="all" />
    <!-- <Comment ref="articleComment" class="article-body-item" :article-id="articleId" /> -->
    <!-- <Message class="article-body-item" :article-id="articleId" @noticeReplayEvent="noticeReplayEvent" @noticeQuoteEvent="noticeQuoteEvent" @noticeUpdateEvent="noticeUpdateEvent" /> -->
  </div>
</template>

<script>
import Title from '@/components/Article/Title'
import PreLine from '@/components/Article/PreLine'
import ArticleDesc from '@/components/Article/ArticleDesc'
import Comment from '@/components/Article/Comment'
import Message from '@/components/Article/Message'
import PrePos from '@/components/Article/PrePos'
import { getArticleDetail } from '@/api/article'
import { parseTime } from '@/utils/index'
import { isEmpty } from 'lodash-es'

export default {
  components: { PrePos, Message, Comment, ArticleDesc, Title, PreLine },
  data: () => {
    return {
      articleData: {
      },
      preLineCategoryMenuNav: [
        {
          name: '首頁'
        }
      ]
    }
  },
  computed: {
    articleId() {
      return Number(this.$route.params.articleId)
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
  methods: {
    eventBus() {
      this.$baseEventBus.$emit('onRouteActive', `/subject/home`)
    },
    openFullScreenEven() {
      this.$baseEventBus.$emit('openFullScreenEven', {
        title: this.articleInfo.title,
        body: this.article.body
      })
    },
    /* 獲取文章詳情 */
    async articleInit() {
      const { articleData } = await getArticleDetail(this.articleId)
      this.articleData = articleData
    },
    parseTime(time, cFormat) {
      return parseTime(time, cFormat)
    },
    isEmpty(val) {
      return isEmpty(val)
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
