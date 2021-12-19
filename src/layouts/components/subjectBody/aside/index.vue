<template>
  <div id="pub_aside">
    <div class="pub-head">
      <span class="article-menu-item" :class="selectItem==1?'article-menu-bottom':''" @click="selectItem=1">
        <span class="icon iconfont fire" />
      </span>
      <span v-show="isArticleInited" class="article-menu-item" :class="selectItem==3?'article-menu-bottom':''" @click="selectItem=3">
        <span class="icon iconfont menu" />
      </span>
    </div>
    <div class="pub-body">
      <div v-show="selectItem==1" class="pub-body-view-posts">
        <div>
          <div class="pub-body-title">熱門文章</div>
          <div>
            <div v-for="(item,key) in hotArticleList" :key="key" class="pub-item">
              <el-avatar :src="item.thumb" />
              <div class="pub-item-wrap">
                <div class="item-title double-ellipsis" @click="clickOpenArticle(item.id)">{{ item.title }}</div>
                <div class="item-see">
                  <span class="icon iconfont see" />
                  <span>{{ item.articleDetil.view }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AsideInfoPage />
      </div>
      <div v-show="selectItem==3" class="pub-body-menulist">
        <BlogNavicatPage />
      </div>
    </div>
  </div>
</template>

<script>
import AsideInfoPage from './AsideInfoPage' // 部落格信息
import BlogNavicatPage from './BlogNavicatPage' // 文章目錄

export default {
  name: 'BodyAside',
  components: { BlogNavicatPage, AsideInfoPage },
  data() {
    return {
      selectItem: 1,
      isArticleInited: false,
      query: {
        order: {
          articleDetils: { view: 'desc' }
        },
        // 分頁
        pagination: {
          // 每頁數量
          size: 5,
          // 頁數
          page: 1
        }
      }
    }
  },
  computed: {
    hotArticleList() {
      return this.$store.state.article.hotArticleList
    }
  },
  created() {
    this.eventBus()
    this.getCategorys()
  },
  methods: {
    eventBus() {
      this.$baseEventBus.$on('articleInited', () => {
        this.selectItem = 3
        this.isArticleInited = true
      })
      this.$baseEventBus.$on('articleInitedClose', () => {
        this.selectItem = 1
        this.isArticleInited = false
      })
      this.$baseEventBus.$on('upHotArticleList', () => {
        this.$store.dispatch('article/setHotArticleList', this.query)
      })
    },
    // 獲取類別
    async getCategorys() {
      this.$store.dispatch('article/setHotArticleList', this.query)
    },
    clickOpenArticle(id) {
      this.$router.push(`/subject/article/${id}`)
    }
  }
}
</script>

<style lang="scss">
  #pub_aside {
    width: 100%;
    font-size: 10px;
    background-color: #f9f9f9;

    .pub-body {
      padding: 13px 17px 13px 17px;
      box-sizing: border-box;
      background-color: #f9f9f9;
      position: relative;
      .pub-body-menulist{
        position: absolute;
        left: 7px;
        right: 5px;
      }
      .pub-body-title {
        margin-bottom: 15px;
        color: #58666e;
        font-size: 15px;
      }

      .pub-item {
        padding-bottom: 25px;

        .pub-face {
          background-size: cover !important;

          display: inline-block;

          vertical-align: top;
          box-shadow: 1px 1px 2px rgba(0, 0, 0, .3);
          cursor: pointer;
          box-sizing: border-box;
        }

        .pub-item-wrap {
          display: inline-block;
          vertical-align: top;
          box-sizing: border-box;
          width: calc(100% - #{$headHeight});
          padding-left: 9px;
          font-size: 0;
          padding-right: 1px;
        }
      }

      .pub-body-comment {
        .item-title, .item-body, .item-committer {
          color: rgb(88, 102, 110);
          font-size: 12.5px;
          cursor: pointer;
        }

        .item-body {
          color: rgb(152, 166, 173);
        }

        .item-committer {
          float: right;
        }
      }

      .pub-body-view-posts {
        .item-title {
          color: #58666e;
          font-size: 12.5px;
          cursor: pointer;
          line-height: 17px;
        }

        .item-see, .item-see .icon {
          font-size: 10px;
          color: #98a6ad;
        }
      }
    }

    .pub-head {
      display: flex;
      border-bottom: 1px solid #e2e8ea;

      .article-menu-bottom {
        border-bottom: 1px solid #b4b4b4;
        box-sizing: border-box;
      }

      .article-menu-item {
        flex: 1;
        text-align: center;
        cursor: pointer;
        height: 100%;
        line-height: 40px;
        margin-top: 10px;
        box-sizing: border-box;

        span {
          font-size: 23px !important;
          color: rgb(152, 166, 173);
        }
      }
    }
  }
</style>
