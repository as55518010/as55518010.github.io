<template>
  <div id="article_title">
    <div class="article-page-head-wrap">
      <div class="author-title">
        <span>{{ article.title }}</span>
        <span class="fangdabtn icon iconfont fangda" @click="$emit('openFullScreenEven')" />
      </div>
      <div class="author-sign">
        <span>
          <span class="icon iconfont renyuanguanli" />
          <span>{{ article.author }}</span>
        </span>
        <span>
          <span class="icon iconfont ios-shijian" />
          <span>{{ parseTime(article.createdAt, '{y}-{m}-{d} {h}:{i}') }}</span>
        </span>
        <span>
          <span class="icon iconfont see" />
          <span>{{ article.articleDetil?article.articleDetil.view:0 }}</span>
          <span>次瀏覽</span>
        </span>
        <span>
          <span class="icon iconfont talk" />
          <span>{{ article.articleDetil?article.articleDetil.view:0 }}</span>
          <span>條評論</span>
        </span>
        <span>
          <span class="icon iconfont pen" />
          <span>{{ article.articleDetil?article.articleDetil.view:0 }}</span>
          <span>字數</span>
        </span>
        <span v-for="(item, index) in article.articleDetil.tag" :key="index">
          <span class="icon iconfont label" />
          <span v-if="article.articleDetil">
            <span class="label-item">
              <span>{{ item }}</span>
            </span>
          </span>
        </span>
      </div>

    </div>
  </div>
</template>

<script>
import BlogContext from '@/context/BlogContext'
import { parseTime } from '@/utils/index'

export default {
  name: 'Title',
  props: {
    article: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data: () => {
    return { articleName: BlogContext.blogName }
  },
  methods: {
    parseTime(time, cFormat) {
      return parseTime(time, cFormat)
    }
  }
}
</script>

<style lang="scss">
  #article_title {
    .article-page-head-wrap {
      border-bottom: 1px solid #e2e8ea;
      padding: 18px 15px 22px 22px;
      background-color: #fff;

      .author-title {
        font-size: 22px;
        margin-bottom: 15px;
        .fangdabtn{
          margin-left: 10px;
          cursor: pointer;
        }
      }

      .author-sign {
        margin-top: 6px;
        color: rgb(152, 166, 173);
        font-size: 12px;

        > span {
          margin-right: 10px;

          .icon {
            margin-right: 1px;
          }
        }

        .renyuanguanli, .ios-shijian, .see, .label {
          font-size: 11px;
        }

        .label-item {
          cursor: pointer;
        }
      }
    }
  }
</style>
