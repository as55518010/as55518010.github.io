<template>
  <div id="category_body">
    <div class="category-body-wrap">
      <div class="head-title">
        <div class="title-font">{{ title }}</div>
      </div>
      <SeriesCard :data="serieData" :show-more="false" :show-title="false" />
      <ArticleList
        :list="article.list"
        :pagination="article.pagination"
        :total="article.total"
        @handlePageChange="handlePageChange"
      />
    </div>
  </div>
</template>
<script>
import { getSeriesDetail } from '@/api/series'
import ArticleList from '@/components/ArticleList'
import SeriesCard from '@/components/SeriesCard'
import VditorPreview from 'vditor/dist/method.min'

export default {
  name: 'Category',
  components: {
    ArticleList,
    SeriesCard
  },
  data: () => {
    return {
      title: '',
      serieData: {},
      article: {
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
    serieId() {
      return Number(this.$route.params.serieId)
    }
  },
  watch: {
    $route: {
      handler: function() {
        this.seriesDetail()
        this.eventBus()
      },
      immediate: true
    }
  },
  methods: {
    eventBus() {
      this.$baseEventBus.$emit('onRouteActive', `/subject/series/${this.serieId}`)
    },
    handlePageChange(page) {
      this.article.pagination.page = page
      this.seriesDetail()
    },
    // 獲取單個類別區塊
    async seriesDetail() {
      const params = {
        pagination: this.article.pagination,
        where: this.article.where
      }
      const { article, serieData } = await getSeriesDetail(
        this.serieId,
        params
      )
      this.serieData = serieData
      this.article.list = article.list
      this.article.total = article.pagination.total
      this.serieData.description = await VditorPreview.md2html(
        serieData.description
      )
      this.title = `系列分類 - ${serieData.name}`
    }
  }
}
</script>

<style lang="scss">
#category_body {
  .pagination {
    text-align: center;
  }
  .category-body-wrap {
    padding-bottom: 10px;
    height: 100%;
    font-size: 0;
    border-right: 1px solid #e2e8ea;
    box-sizing: border-box;
    background-color: #f6f8f9;
    .article-list-wrap {
      padding-top: 20px;
      .item-wrap:last-of-type {
      }
      .item-wrap {
        background-color: #fcfeff;
        overflow: hidden;
        box-sizing: border-box;
        border-radius: 5px;
        margin: 0px 20px 20px;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
        .complex-item {
          .item-body {
            line-height: 1.5;
            height: 175px;
            box-sizing: border-box;
            padding: 20px 15px 15px 20px;
            display: inline-block;
            vertical-align: top;
            position: relative;
            @include categoryBodyCalWidth();
            @include deve1() {
              padding: 3px 10px 5px 12px;
              height: 100px;
            }

            .item-title {
              font-size: 22px;
              margin-bottom: 10px;
              cursor: pointer;
              @include deve1() {
                margin-bottom: 2px;
                font-size: 20px;
              }
            }

            .item-desc {
              line-height: 25px;
              font-size: 14px;
              color: #a2b0b7;
              cursor: pointer;
              @include deve1() {
                -webkit-line-clamp: 2;
                font-size: 13px;
                line-height: 20px;
              }
            }

            .item-bottom {
              border-top: 1px solid #dee5e7;
              box-sizing: border-box;
              position: absolute;
              padding-top: 5px;
              bottom: 6px;
              left: 20px;
              right: 20px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              display: inline-block;
              @include deve1() {
                padding-top: 1px;
                bottom: -2px;
                text-align: left;
              }
              .item-time,
              .item-read,
              .item-comment {
                padding-left: 12px;
              }

              .item-author,
              .item-time,
              .item-read,
              .item-comment {
                cursor: pointer;
                color: #a2b0b7;
                display: inline-block;
                font-size: 12px;

                .icon {
                  font-size: 10px;
                }
              }
            }
          }
          .item-img {
            display: inline-block;
            vertical-align: top;

            .div-img,
            img {
              width: 250px;
              @include itemBodyHeight();
              border-radius: 5px 0 0 5px;
              transform: translateY(-0.5px) translateX(1px);
              padding-top: 0.5px;
              box-sizing: border-box;
              cursor: pointer;
              background-size: 100% 100%;
              @include categoryImgWidth();
            }
          }
        }
        .simple-item {
          .simple-item-body {
            padding: 25px;
            .simple-item-title {
              color: #323232;
              cursor: pointer;
              font-size: 23px;
              font-weight: 600;
            }

            .simple-item-bottom {
              cursor: pointer;
              margin-top: 14px;
              font-size: 14px;
              color: #97979f;
            }
          }
        }
      }
    }

    .head-title {
      display: inline-block;
      width: 100%;
      padding: 11px 15px 9px 20px;
      border-bottom: 1px solid #e2e8ea;
      box-sizing: border-box;
      background-color: white;
      height: 55px;
      .title-font {
        display: inline-block;
        font-size: 22px;
        font-weight: 500;
        color: black;
        padding: 0px 0 6px 0;
      }
      .title-thumb {
        display: inline-block;
        font-size: 23px;
        color: black;
      }

      .title-sign {
        margin-left: 10px;
        display: inline-block;
        color: #98a6ad;
        font-size: 12px;
        max-width: 65%;
      }
    }
  }
}
</style>
