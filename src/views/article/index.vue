<template>
  <div v-if="!isEmpty(articleData)" id="article_body">
    <Title v-if="!isEmpty(articleData)" :article="articleData" />
    <PreLine :data="preLineCategoryMenuNav" />
    <ArticleDesc :article="articleData" class="article-body-item" />
    <PrePos :article="articleData" class="article-body-margin" target="all" />
  </div>
</template>

<script>
import Title from '@/components/Article/Title'
import PreLine from '@/components/Article/PreLine'
import ArticleDesc from '@/components/Article/ArticleDesc'
import PrePos from '@/components/Article/PrePos'
import { getArticleDetail, patchArticleDetail } from '@/api/article'
import { parseTime } from '@/utils/index'
import { isEmpty } from 'lodash-es'

export default {
  components: { PrePos, ArticleDesc, Title, PreLine },
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
  beforeDestroy() {
    this.$baseEventBus.$emit('articleInitedClose')
  },
  methods: {
    eventBus() {
      this.$baseEventBus.$emit('onRouteActive', `/subject/home`)
    },
    /* 獲取文章詳情 */
    async articleInit() {
      const { articleData } = await getArticleDetail(this.articleId)
      this.upView(articleData)
      this.articleData = articleData
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
