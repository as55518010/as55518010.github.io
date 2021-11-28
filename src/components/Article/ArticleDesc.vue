<template>
  <div id="article_desc">
    <div class="article-page-body-wrap">
      <div class="inner-body-wrap">
        <div ref="articleBody" data-toc="#toc_page" />
        <div ref="outline" />
        <div class="body-wrap-bottom"><span class="icon iconfont ios-shijian" />
          最後修改時間：{{ parseTime(article.updatedAt, '{y}-{m}-{d} {h}:{i}' ) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils/index'
import VditorMethod from 'vditor/dist/method.min'

export default {
  name: 'ArticleDesc',
  props: {
    article: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      isFucus: true,
      isDigg: true
    }
  },
  watch: {
    article() {
      this.initPageList()
    }
  },
  mounted() {
    this.initPageList()
  },
  beforeDestroy: function() {
    this.$baseEventBus.$emit('articleDestroy', true)
  },
  methods: {
    async initPageList() {
      const loading = this.$baseLoading()
      await VditorMethod.preview(this.$refs.articleBody, this.article.content, {
        lang: 'zh_TW'
      })
      this.$nextTick(() => {
        this.$baseEventBus.$emit('articleInited', this.$refs.articleBody)
        loading.close()
      })
    },
    parseTime(time, cFormat) {
      return parseTime(time, cFormat)
    }
  }
}
</script>

<style>
@import url(~vditor/dist/index.css);
</style>
<style lang="scss">
#article_desc {
  .article-page-body-wrap {
    font-size: 15px;
    box-sizing: border-box;
    .inner-body-wrap {
      border-bottom: 1px solid lightgrey;
      .body-wrap-bottom {
        font-size: 12px;
        color: #9b9b9b;
        padding-top: 5px;
        padding-bottom: 8px;
        .ios-shijian {
          font-size: 11px;
        }
      }
    }
    .post-body-bottom {
      font-size: 15px;
      margin-top: 8px;
      margin-bottom: 8px;
      text-align: center;
      font-size: 12px;
      color: rgba(60, 60, 60, 0.95);
      @include switchHeadBar() {
        font-size: 10px;
      }
      .post-bottom-item:hover {
        background-color: rgba(220, 220, 220, 0.7);
      }

      .post-bottom-item:active {
        background-color: rgba(220, 220, 220, 0.6);
      }

      .post-bottom-item {
        display: inline-block;
        padding: 2px 8px 2px 8px;
        margin-top: 3px;
        background-color: rgba(240, 240, 240, 0.8);
        box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        border: 1px solid rgb(204, 204, 204);
        cursor: pointer;
        margin-left: 4px;
        margin-right: 4px;
        @include switchHeadBar() {
          height: 18px;
          line-height: 14px;
          .icon {
            position: relative;
            top: 1px;
          }
        }
      }
    }
    .post-article-right {
      padding-top: 5px;
      text-align: right;
      > div {
        cursor: pointer;
        display: inline-block;
        > span,
        .icon {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
