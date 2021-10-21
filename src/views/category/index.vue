<template>
  <div id="category_body">
    <div class="category-body-wrap">
      <div class="head-title">
        <div class="title-font">{{ title }}</div>
      </div>
      <el-tabs v-model="tabsValue" type="card">
        <el-tab-pane label="文章列表" name="article">
          <ArticleList
            :list="article.list"
            :pagination="article.pagination"
            :total="article.total"
            @handlePageChange="articleHandlePageChange"
            @routerLinkTo="routerLinkTo"
          />
        </el-tab-pane>
        <el-tab-pane label="系列管理" name="series">
          <SeriesList
            :list="serie.list"
            :pagination="serie.pagination"
            :total="serie.total"
            :category-id="categoryId"
            @handlePageChange="seriesHandlePageChange"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { getCategorieDetail } from '@/api/categorie'
import ArticleList from '@/components/ArticleList'
import SeriesList from './components/SeriesList.vue'

export default {
  name: 'Category',
  components: {
    ArticleList,
    SeriesList
  },
  data: () => {
    return {
      title: '',
      tabsValue: 'article',
      categoryData: {},
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
      },
      serie: {
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
      return Number(this.$route.params.categorieId)
    }
  },
  watch: {
    $route: {
      handler: function() {
        this.categorieInit()
        this.eventBus()
      },
      immediate: true
    }
  },
  methods: {
    eventBus() {
      this.$baseEventBus.$emit('onRouteActive', `/subject/category/${this.categoryId}`)
    },
    articleHandlePageChange(page) {
      this.article.pagination.page = page
      this.categorieInit()
    },
    seriesHandlePageChange(page) {
      this.serie.pagination.page = page
      this.categorieInit()
    },
    // 獲取單個類別區塊
    async categorieInit() {
      const params = {
        article: {
          pagination: this.article.pagination,
          where: this.article.where
        },
        serie: {
          pagination: this.serie.pagination,
          where: this.serie.where
        }
      }
      const { categoryData, article, serie } = await getCategorieDetail(
        this.categoryId,
        params
      )
      this.categoryData = categoryData
      this.title = `文章分類 - ${categoryData.name}`
      this.articleRes(article)
      this.serieRes(serie)
    },
    articleRes(res) {
      this.article.list = res.list
      this.article.total = res.pagination.total
    },
    serieRes(res) {
      this.serie.list = res.list
      this.serie.total = res.pagination.total
    },
    routerLinkTo(id) {
      this.$router.push(`/subject/category/${this.categoryId}/article/${id}`)
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
